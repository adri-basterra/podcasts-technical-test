import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Header from './Header';

describe('Header', () => {
  test('renders heading', () => {
    // Uses Link from react-router-dom so it needs BrowserRouter
    render(<BrowserRouter><Header /></BrowserRouter>);
    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();
  });

  test('renders correct heading', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const heading = screen.getByRole("heading");
    expect(heading).toBeDefined();
  });

  test('renders link', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

})
