import React from 'react';
import { render, screen } from '@testing-library/react';
import { DocumentProvider } from '../../context/DocumentContext';
import { DocumentViewer } from './DocumentViewer';

describe('DocumentViewer', () => {
  const initialState = {
    originalDoc: 'Original document content',
    improvedDoc: 'Improved document content',
    suggestions: [],
    loading: false,
    error: null,
  };

  test('renders original and improved documents', async () => {
    render(
      <DocumentProvider initialState={{ 
        originalDoc: 'Original document content',
        improvedDoc: 'Improved document content',
        suggestions: [],
        loading: false, // Ensure loading is false
        error: null,
      }}>
        <DocumentViewer />
      </DocumentProvider>
    );
  
      // Wait for document state to update
      expect(screen.getByTestId('original-doc')).toBeInTheDocument();expect(screen.getByTestId('improved-doc')).toBeInTheDocument();


     // Check if text is displayed
     const originalTextElements = screen.getAllByText(/original document content/i);
     expect(originalTextElements[0]).toBeInTheDocument(); // Ensure at least one exists
     expect(screen.getByText(/improved document content/i)).toBeInTheDocument();
  });
  

  test('displays loading state', () => {
    render(
      <DocumentProvider initialState={{ ...initialState, loading: true }}>
        <DocumentViewer />
      </DocumentProvider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message', async () => {
    render(
      <DocumentProvider initialState={{ 
        originalDoc: null, 
        improvedDoc: null, 
        suggestions: [], 
        loading: false, 
        error: 'File too large' 
      }}>
        <DocumentViewer />
      </DocumentProvider>
    );
  
    // Wait for error message to appear
  expect(await screen.findByTestId('error-message')).toBeInTheDocument();
  
    // Ensure correct error message
  expect(screen.getByText(/file too large/i)).toBeInTheDocument();
  });
  
});
