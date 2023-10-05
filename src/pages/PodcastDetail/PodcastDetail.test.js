import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import PodcastDetail from './PodcastDetail';

describe('PodcastDetail', () => {

  test('renders table', () => {
    // Uses Link from react-router-dom so it needs BrowserRouter
    render(<BrowserRouter><PodcastDetail /></BrowserRouter>);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });

  test('renders table with class', () => {
    render(<BrowserRouter><PodcastDetail /></BrowserRouter>);
    const table = screen.getByRole("table");
    expect(table).toHaveClass("episodes__table");
  });

})
