import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import PodcastPreview from './PodcastPreview';

describe('PodcastPreview', () => {
  const podcastData = {
    title: "Turned Out A Punk",
    image: "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/80/2a/07/802a07a4-d3c5-70fb-3367-4a22756226f1/mza_9366043580049857023.png/55x55bb.png",
    author: "Turned Out A Punk Turned Out A Punk",
  }

  test('renders title', () => {
    render(<PodcastPreview title={podcastData.title} image={podcastData.image} author={podcastData.author} />);
    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  test('renders image', () => {
    render(<PodcastPreview title={podcastData.title} image={podcastData.image} author={podcastData.author} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });

  test('renders author structure', () => {
    render(<PodcastPreview title={podcastData.title} image={podcastData.image} author={podcastData.author} />);
    const author = screen.getAllByText(`Author: ${podcastData.author}`);
    expect(author).toBeDefined();
  });
})
