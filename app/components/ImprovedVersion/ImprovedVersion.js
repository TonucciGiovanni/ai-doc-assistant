'use client';
import styles from './ImprovedVersion.module.css';
import { useDocument } from '../../context/DocumentContext';
import { DiffHighlighter } from '../DiffHighlighter/DiffHighlighter';

export const ImprovedVersion = () => {
  const { state, dispatch, mergeDocument, checkReviewStatus } = useDocument();

  const handleAccept = (id) => {
    dispatch({ type: 'UPDATE_SUGGESTION', payload: { id, status: 'accepted' } });
    checkReviewStatus();
  };

  const handleReject = (id) => {
    dispatch({ type: 'UPDATE_SUGGESTION', payload: { id, status: 'rejected' } });
    checkReviewStatus();
  };

  const handleReviewComplete = () => {
    mergeDocument();
  };

  const handleDownload = () => {
    if (!state.finalDoc) return;
    
    const element = document.createElement('a');
    const file = new Blob([state.finalDoc], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'improved-document.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className={styles.container}>
      <h3>Document with Suggested Changes</h3>
      
      <DiffHighlighter
        original={state.originalDoc}
        improved={state.improvedDoc}
        suggestions={state.suggestions}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      <div className={styles.actions}>
        <button
          onClick={handleReviewComplete}
          className={styles.reviewButton}
          disabled={!state.allSuggestionsReviewed}
        >
          Review Complete
        </button>

        {state.finalDoc && (
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Final Document
          </button>
        )}
      </div>
    </div>
  );
};