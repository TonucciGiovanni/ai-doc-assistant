'use client';
import React from 'react';
import styles from './ImprovedVersion.module.css';
import { useDocument } from '../../context/DocumentContext';
import { DiffHighlighter } from '../DiffHighlighter/DiffHighlighter';


// ImprovedVersion component for displaying and managing document improvements.
export const ImprovedVersion = () => {
  const { state, dispatch, mergeDocument, checkReviewStatus } = useDocument();

  // Handles the acceptance of a suggestion
  const handleAccept = (id) => {
    dispatch({ type: 'UPDATE_SUGGESTION', payload: { id, status: 'accepted' } });
    checkReviewStatus();
  };

//Handles the rejection of a suggestion.
  const handleReject = (id) => {
    dispatch({ type: 'UPDATE_SUGGESTION', payload: { id, status: 'rejected' } });
    checkReviewStatus();
  };

  // Handles the completion of the review process.
  const handleReviewComplete = () => {
    mergeDocument();
  };
  
  // Handles the submission of a suggestion.

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

  // Renders the ImprovedVersion component.
  return (
    <div className={styles.container}>
      <h3>Document with Suggested Changes</h3>
      
      <DiffHighlighter
        original={state.originalDoc}
        improved={state.improvedDoc}
        suggestions={state.suggestions}
        onAccept={handleAccept}
        onReject={handleReject}
        data-testid = "suggestion-list"
      />

      <div className={styles.actions}>
        <button
          onClick={handleReviewComplete}
          className={styles.reviewButton}
          disabled={!state.allSuggestionsReviewed ?? false}
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