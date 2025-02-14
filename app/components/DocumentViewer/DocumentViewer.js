'use client';
import React from 'react';
import styles from './DocumentViewer.module.css';
import { useDocument } from '../../context/DocumentContext';
import { ImprovedVersion } from '../ImprovedVersion/ImprovedVersion';


// DocumentViewer component that renders the original and improved versions of the uploaded document
export const DocumentViewer = () => {
  const { state } = useDocument();

  // Check if the state is null, loading, or error before rendering the document viewer
  if (!state) { // Handle null state
    return <p data-testid="loading">Initializing...</p>;
  }

  if (state.loading) {
    return <p data-testid="loading">Loading...</p>;
  }

  if (state.error) {
    return <p data-testid="error-message">{state.error}</p>;
  }

  // Apply any necessary transformations to the originalDoc here before rendering it
  return (

    <div className={styles.container}>
      <div className={styles.pane}>
        <h3>Original Document</h3>
        <pre className={styles.content} data-testid="original-doc">{state.originalDoc || "No document uploaded."}</pre>
      </div>

      <div className={styles.pane}>
        <h3>Improved Version</h3>
        <pre className={styles.content} data-testid="improved-doc">{state.improvedDoc || "No improved version."}
        </pre>
        {/* display edits and highlight differences */}
        <ImprovedVersion />
      </div>
    </div>
  );
};