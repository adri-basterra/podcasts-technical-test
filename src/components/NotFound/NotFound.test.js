import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import NotFound from './NotFound';

describe('NotFound', () => {
  const ELEMENT = "Example";

  test('renders image', () => {
    render(<NotFound />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  test('renders element', () => {
    render(<NotFound element={ELEMENT} />);
    const element = screen.getByRole("heading");
    expect(element).toBeInTheDocument();
  });

  test('renders correct element', () => {
    render(<NotFound element={ELEMENT} />);
    const emptyTitle = screen.getByRole("heading");
    expect(emptyTitle).toHaveTextContent(ELEMENT);
  });

})
