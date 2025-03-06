import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Anecdote of the Day', () => {
  render(<App />);
  const headingElement = screen.getByText(/Anecdote of the Day/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders Anecdote with most votes', () => {
  render(<App />);
  const headingElement = screen.getByText(/Anecdote with most votes/i);
  expect(headingElement).toBeInTheDocument();
});