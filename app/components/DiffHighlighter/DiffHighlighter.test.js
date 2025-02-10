import React from 'react';
import { render, screen } from '@testing-library/react';
import { DiffHighlighter } from './DiffHighlighter';

test('displays suggestions correctly', () => {
  const suggestions = [{
    id: 1, 
    start: 0, // Starting index of the suggestion in the original text
    end: 40, // Ending index of the suggestion in the original text
    text: 'Improved', // Suggested text to replace the original
    original: 'Original', // Original text to be replaced
    type: 'grammar', // Type of suggestion (e.g., grammar, spelling)
    status: 'pending', // Current status of the suggestion
  }];

  render(
    <DiffHighlighter
      original="Original text"
      suggestions={suggestions}
    />
  );

  // Verify original text is strikethrough
  expect(screen.getByText(/Original/)).toHaveStyle('text-decoration: line-through');
});