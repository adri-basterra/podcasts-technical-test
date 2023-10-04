import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PodcastPreview from "../../components/PodcastPreview/PodcastPreview";
import "./Home.styles.scss";

function Home() {
  const PAGE_TITLE = "Podcaster";
  const [podcastList, setPodcastList] = useState([]);

  useEffect(() => {
    fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((list) => {
        setPodcastList(list.feed.entry);
        console.log(list.feed.entry[0]);
      });
  }, []);

  const LoadingElement = () => {
    <div>Loading...</div>;
  };

  const PodcastListElements = () => {
    return podcastList.map((podcast) => (
      <Link
        key={podcast.id.label}
        to={`/podcast/${podcast.id.attributes["im:id"]}`}
        className="podcasts__link"
      >
        <PodcastPreview
          title={podcast.title.label}
          author={podcast["im:artist"].label}
          image={podcast["im:image"][0].label}
        />
      </Link>
    ));
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="header__title">{PAGE_TITLE}</h2>
      </div>
      <div className="podcasts">
        {!podcastList ? <LoadingElement /> : <PodcastListElements />}
      </div>
    </div>
  );
}

export default Home;
