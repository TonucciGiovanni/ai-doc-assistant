import React from 'react'; // Add this import
import { renderHook, act } from '@testing-library/react';
import { DocumentProvider, useDocument } from './DocumentContext';

test('updates suggestions status', () => {
  // Define the wrapper component
  const wrapper = ({ children }) => <DocumentProvider>{children}</DocumentProvider>;;
  
  // Render the hook
  const { result } = renderHook(() => useDocument(), { wrapper });

  // Initialize suggestions
  act(() => {
    result.current.dispatch({
      type: 'UPLOAD_SUCCESS',
      payload: {
        original: 'Test document',
        improved: 'Improved document',
        suggestions: [{ id: 1, status: 'pending' }],
      },
    });
  });

  // Update suggestion status
  act(() => {
    result.current.dispatch({
      type: 'UPDATE_SUGGESTION',
      payload: { id: 1, status: 'accepted' },
    });
  });

  // Verify the suggestion status was updated
  expect(result.current.state.suggestions[0].status).toBe('accepted');
});