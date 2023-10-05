import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  const SEARCH_PLACEHOLDER = "Filter podcasts...";

  test('renders input', () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test('renders input with class', () => {
    render(<Home />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("search__input");
  });

  test('renders input with placeholder', () => {
    render(<Home />);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    expect(input).toBeDefined();
  });

})
