import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as Utils from "../../../domain/utils/utils";

import PodcastPreview from "../../components/PodcastPreview/PodcastPreview";
import "./Home.styles.scss";

function Home() {
  const searchPlaceholder = "Filter podcasts...";

  const [podcastList, setPodcastList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`,
      { method: "GET" }
    )
      .then((response) => response.json())
      .then((list) => setPodcastList(list.feed.entry));
  }, []);

  const LoadingElement = () => {
    <div>Loading...</div>;
  };

  function applyFilters(podcastList, search) {
    if (!search) return podcastList;
    return podcastList.filter(searchCoincidences);
  }

  const searchCoincidences = (podcast) => {
    const authorName = podcast["im:artist"].label;
    const podcastTitle = podcast["im:name"].label;
    const matchesWith = Utils.searchMatches(search);
    return matchesWith(podcastTitle) || matchesWith(authorName);
  };

  const PodcastListElements = () => {
    return applyFilters(podcastList, search).map((podcast) => (
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
      <div className="search">
        <span className="search__quantity">100</span>
        <input
          className="search__input"
          placeholder={searchPlaceholder}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="podcasts">
        {!podcastList ? <LoadingElement /> : <PodcastListElements />}
      </div>
    </div>
  );
}

export default Home;
