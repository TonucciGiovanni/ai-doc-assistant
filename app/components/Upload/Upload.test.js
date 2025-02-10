import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DocumentProvider } from '../../context/DocumentContext';
import { Upload } from './Upload';

// Test case to verify file upload functionality
test('handles file upload', async () => {
  const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

  render(
    <DocumentProvider>
      <Upload />
    </DocumentProvider>
  );

  const input = screen.getByLabelText(/upload document/i);
  fireEvent.change(input, { target: { files: [file] } });

  // Verify loading state
  expect(await screen.findByText(/processing document/i)).toBeInTheDocument();

});