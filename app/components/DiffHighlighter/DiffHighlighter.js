'use client';
import React from 'react';
import styles from './DiffHighlighter.module.css';

// A component for highlighting differences between two content strings
export const DiffHighlighter = ({ original, suggestions, onAccept, onReject }) => {
  const getHighlightedContent = () => {
    let content = original;
    const elements = [];
    let lastIndex = 0;

    // Sort suggestions by start index descending
    const sortedSuggestions = [...suggestions].sort((a, b) => b.start - a.start);

    sortedSuggestions.forEach((suggestion) => {
      const start = suggestion.start;
      const end = suggestion.end;
      
      // Add text after the suggestion
      elements.unshift(
        <span key={`after-${suggestion.id}`} className={styles.unchanged}>
          {content.slice(end, lastIndex)}
        </span>
      );
      
      // Add the suggestion
      elements.unshift(
        <span
          key={suggestion.id}
          className={`${styles.suggestion} ${styles[suggestion.type]}`}
          data-testid={`suggestion.id-${suggestion.id}`} //added test id
        >

          <span className={styles.originalText} style={{ textDecoration: 'line-through' }}>
            {content.slice(start, end)}
          </span>

          <span className={styles.suggestedText}>
            {suggestion.text}
          </span>
          <div className={styles.controls}>
            <button
              onClick={() => onAccept(suggestion.id)}
              className={styles.accept}
              disabled={suggestion.status === 'accepted'}
              data-testid={`accept.id-${suggestion.id}`} //added test id
            >
              ✓
            </button>
            <button
              onClick={() => onReject(suggestion.id)}
              className={styles.reject}
              disabled={suggestion.status === 'rejected'}
              data-testid={`reject.id-${suggestion.id}`} //added test id
            >
              ✕
            </button>
          </div>
        </span>
      );

      lastIndex = start;
    });

    // Add remaining text before the last suggestion
    elements.unshift(
      <span key="remaining" className={styles.unchanged}>
        {content.slice(0, lastIndex)}
      </span>
    );

    return elements;
  };

  return (
    <div className={styles.container}>
      <pre className={styles.content} data-testid="highlighted-content">
        {getHighlightedContent()}
      </pre>
    </div>
  );
};