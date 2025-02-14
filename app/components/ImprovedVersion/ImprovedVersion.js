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

  const handleReviewComplete = () => {
    mergeDocument(); //Applies accepted changes to the finalDocument
  };
  
  // Handles the submission of a suggestion.

  const handleDownload = () => {
    if (!state.finalDoc) return;
    
    const element = document.createElement('a'); //trigger the download
    const file = new Blob([state.finalDoc], { type: 'text/plain' }); // create the file
    element.href = URL.createObjectURL(file); // convert the Blob to downloadable URL
    element.download = 'improved-document.txt'; // file name definition
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Renders the ImprovedVersion component.
  return (
    <div className={styles.container}>
      <h3>Document with Suggested Changes</h3>
      
      <DiffHighlighter
        original={state.originalDoc} //pass the original document
        // improved={state.improvedDoc}
        suggestions={state.suggestions} // suggested changes
        onAccept={handleAccept}
        onReject={handleReject}
        // data-testid = "suggestion-list"
      />

      {/* Show a message if all suggestions have been reviewed */}
      <div className={styles.actions}>
        <button
          onClick={handleReviewComplete}
          className={styles.reviewButton}
          disabled={!state.allSuggestionsReviewed}
        >
          {/*disable button until suggestions are reviewed*/}
          Review Complete
        </button>

        {/* Show download button if final document is available & run when clicked */}
        {state.finalDoc && (
          <button onClick={() => handleDownload (state.finalDoc)} className={styles.downloadButton}>
            Download Final Document
          </button>
        )}
      </div>
    </div>
  );
};