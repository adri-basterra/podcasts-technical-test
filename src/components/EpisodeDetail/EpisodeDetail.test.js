import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import EpisodeDetail from './EpisodeDetail';

describe('EpisodeDetail', () => {

  const episodeData = {
    title: "Radiohead: In Rainbows",
    url: "https://traffic.megaphone.fm/GLT2637514154.mp3?updated=1695074351",
    desc: "Our season long dissection of Radiohead's In Rainbows begins with a sweeping biography of the band, from their origins in Oxford, England to their historic run of landmark albums like The Bends, OK Computer, and Kid A.\nSupport Dissect by leaving a review or sharing this episode on social media. It really helps.\nFollow @dissectpodcast on Instagram, TikTok, and Twitter.\nLearn more about your ad choices. Visit podcastchoices.com/adchoices",
    type: "audio/mp3"
  }

  test('renders title', () => {
    render(<EpisodeDetail title={episodeData.title} url={episodeData.url} desc={episodeData.desc} type={episodeData.type} />);
    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<EpisodeDetail title={episodeData.title} url={episodeData.url} desc={episodeData.desc} type={episodeData.type} />);
    const description = screen.getByRole("contentinfo");
    expect(description).toBeInTheDocument();
  });

  test('renders empty title', () => {
    render(<EpisodeDetail url={episodeData.url} desc={episodeData.desc} type={episodeData.type} />);
    const emptyTitle = screen.getByRole("heading");
    expect(emptyTitle).toHaveTextContent("");
  });

})
