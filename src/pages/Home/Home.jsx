import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PodcastPreview, Loading } from "../../components";
import { PodcastService } from "../../services/Podcast.service";
import * as Utils from "../../utils/utils";

import "./Home.styles.scss";

function Home() {
  const SEARCH_PLACEHOLDER = "Filter podcasts...";

  const [podcastList, setPodcastList] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    PodcastService.getAllPodcasts()
      .then((podcasts) => {
        setPodcastList(podcasts);
        setQuantity(podcasts.length);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  function applySearch(newSearch) {
    const filtered = applyFilters(podcastList, newSearch);
    setQuantity(filtered.length);
    setSearch(newSearch);
  }

  function applyFilters(podcastList, search) {
    if (!search) return podcastList;
    return podcastList.filter(searchCoincidences);
  }

  const searchCoincidences = (podcast) => {
    if (!podcast) return false;

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

  if (loading) return <Loading />;
  if (error) return;

  return (
    <div className="container">
      <div className="search">
        <span className="search__quantity">{quantity}</span>
        <input
          className="search__input"
          placeholder={SEARCH_PLACEHOLDER}
          onChange={(e) => applySearch(e.target.value)}
        />
      </div>
      <div className="podcasts">
        {!podcastList ? <Loading /> : <PodcastListElements />}
      </div>
    </div>
  );
}

export default Home;
