AI Document Assistant 

Overview
AI Document Assistant is a React and Next.js-based web application designed to help users enhance their documents by leveraging AI-powered grammar and spelling corrections. The app allows users to upload documents, review grammar suggestions powered by the LanguageTool API (https://api.languagetool.org/v2/check), and download an improved version of their text.  

Features 
Document Upload: Users can upload `.txt`, `.docx`, or `.pdf` files.  
Grammar & Spelling Check: Integrates LanguageTool API to provide grammar and spelling corrections.  
Interactive Editing: Users can review suggestions, accept/reject changes, and finalize their document.  
Real-time Preview: View and modify text before downloading.  
Download Improved Document: Once satisfied, users can download the **corrected version.  

Tech Stack  
- Frontend: React, Next.js, TypeScript  
- Backend: Node.js (for API handling)  
- Styling: Tailwind CSS  
- Document Processing: FileReader API, `docx` library for `.docx` parsing  
- Grammar Correction: LanguageTool API (`https://api.languagetool.org/v2/check`)  
- Version Control Git & GitHub  

 How It Works  
1. Upload a document  
2. Grammar check begins (via LanguageTool API)  
3. View suggestions & select changes  
4. Apply corrections & preview final document  
5. Download the improved version  

Installation & Running the Project 
1. Clone the Repository  
git clone https://github.com/yourusername/ai-document-assistant.git
cd ai-document-assistant


2. Install Dependencies  
npm install
or
yarn install


3. Run the Development Server  
npm run dev
or
yarn dev

Open http://localhost:3000](http://localhost:3000)  

 API Integration 
The project uses the LanguageTool API to check for grammar errors.  
Example API request:  

async function checkGrammar(text) {
  const response = await fetch("https://api.languagetool.org/v2/check", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ text: text, language: "en-US" }),
  });
  return response.json();
}


 Future Enhancements  
AI-powered paraphrasing & summarization  
Support for more file formats (Markdown, Google Docs)  
UI improvements with real-time collaboration  
