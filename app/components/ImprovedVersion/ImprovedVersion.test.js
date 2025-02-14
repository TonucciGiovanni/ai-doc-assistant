import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DocumentProvider } from '../../context/DocumentContext';
import { ImprovedVersion } from './ImprovedVersion';

test('allows accepting and rejecting suggestions', async () => {
  const initialState = {
    originalDoc: 'Original content',
    improvedDoc: 'Improved content',
    suggestions: [
      {
        id: 1,
        start: 0,
        end: 8,
        text: 'Improved',
        original: 'Original',
        type: 'grammar',
        status: 'pending',
      },
    ],
  };

  // component has access to the document data and suggestions
  render(
    <DocumentProvider initialState={initialState}>
      <ImprovedVersion />
    </DocumentProvider>
  );

  // Wait for the suggestion to appear
  const suggestion = await screen.findByTestId('suggestion.id-1');
  expect(suggestion).toBeInTheDocument();

  // Accept suggestion (simulates a click on the accept button)
  const acceptButton = await screen.findByTestId('accept.id-1');
  fireEvent.click(acceptButton);

  // Ensure accept button is disabled after click
  await waitFor(() => expect(acceptButton).toBeDisabled());

  // Reject suggestion
  const rejectButton = await screen.findByTestId('reject.id-1');
  fireEvent.click(rejectButton);

  // Ensure reject button is disabled after click
  await waitFor(() => expect(rejectButton).toBeDisabled());
});
