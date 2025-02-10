import React from 'react';
import { render, screen } from '@testing-library/react';
import { DiffHighlighter } from './DiffHighlighter';

test('displays suggestions correctly', () => {
  const suggestions = [{
    id: 1,
    start: 0,
    end: 8,
    text: 'Improved',
    original: 'Original',
    type: 'grammar',
    status: 'pending',
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