'use client';
import styles from './Upload.module.css';
import { useDocument } from '../../context/DocumentContext';

const allowedTypes = [
  'text/plain',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const readFileContent = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const content = e.target.result;

      // Handle PDF files
      if (file.type === 'application/pdf') {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        try {
          const loadingTask = pdfjs.getDocument(new Uint8Array(content));
          const pdf = await loadingTask.promise;
          let text = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            text += textContent.items.map((item) => item.str).join(' ');
          }

          resolve(text);
        } catch (error) {
          reject(new Error(`Failed to parse file: ${error.message}`));
        }
      }
      // Handle DOCX files
      else if (
        file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({ arrayBuffer: content });
        resolve(result.value);
      }
      // Handle plain text files
      else {
        resolve(content);
      }
    };

    reader.onerror = reject;

    // Read the file as ArrayBuffer for DOCX and PDF, or as text for TXT
    if (
      file.type === 'application/pdf' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
};

export const Upload = () => {
  const { dispatch } = useDocument();

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      dispatch({ type: 'UPLOAD_ERROR', payload: 'Invalid file type' });
      return;
    }

    dispatch({ type: 'UPLOAD_START' });

    try {
      const content = await readFileContent(file);

      // Simulated API response
      const improvedContent = content + "\n\n[Simulated improvements]";
      const simulatedSuggestions = [
        {
          id: 1,
          original: 'Original sentence 1',
          text: 'Improved sentence 1',
          type: 'clarity',
          status: 'pending',
          start: 50,  // Character start index
          end: 68     // Character end index
        },
        {
          id: 2,
          original: 'Original sentence 2',
          text: 'Improved sentence 2',
          type: 'grammar',
          status: 'pending',
          start: 70,
          end: 88
        }
      ];

      // Dispatch the uploaded document details to the DocumentContext
      dispatch({
        type: 'UPLOAD_SUCCESS',
        payload: {
          original: content,
          improved: improvedContent,
          suggestions: simulatedSuggestions,
        },
      });
    } catch (error) {
      dispatch({ type: 'UPLOAD_ERROR', payload: error.message });
    }
  };

  // Render the upload component with the provided styles
  return (
    <div className={styles.uploadContainer}>
      <label className={styles.uploadLabel}>
        <input
          type="file"
          accept=".txt,.docx,.pdf"
          onChange={handleFileUpload}
          className={styles.uploadInput}
        />
        Upload Document
      </label>
    </div>
  );
};