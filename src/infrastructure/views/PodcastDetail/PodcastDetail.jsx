import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as Utils from "./../../../domain/utils/utils";
import "./PodcastDetail.styles.scss";

// TODO: export to service
const apiHost = "https://itunes.apple.com";
const allowOriginsURL = "https://api.allorigins.win/raw?url=";
const podcastEpisodeFiltersURL =
  "country=US&media=podcast&entity=podcastEpisode&limit=100";

function PodcastDetail() {
  const { id } = useParams();

  const [podcastDetail, setPodcastDetail] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  // TODO: create service
  useEffect(() => {
    const filters = `/lookup?id=${id}&${podcastEpisodeFiltersURL}`;
    fetch(allowOriginsURL + encodeURIComponent(`${apiHost}${filters}`), {
      method: "GET",
    })
      .then((response) => response.json())
      .then((detail) => {
        const episodeList =
          detail.results.filter(
            (res) => res.wrapperType === "podcastEpisode"
          ) ?? [];
        const podcast = detail.results.find(
          (res) => res.wrapperType === "track"
        );
        setPodcastDetail(podcast);
        setEpisodes(episodeList);
      });
  }, []);

  const EpisodesDataElement = () => {
    return episodes.map((episode) => (
      <tr key={episode.trackId}>
        <td>
          <Link to={`/podcast/${id}/episode/${episode.trackId}`}>
            {episode.trackName}
          </Link>
        </td>
        <td>{new Date(episode.releaseDate ?? "").toLocaleDateString()}</td>
        <td>{Utils.milisecondsToClockMinutes(episode.trackTimeMillis)}</td>
      </tr>
    ));
  };

  return (
    <>
      <div className="podcast__container">
        {podcastDetail && (
          <aside className="podcast">
            <img className="podcast__image" src={podcastDetail.artworkUrl600} />
            <hr />
            <h4 className="podcast__title">{podcastDetail.collectionName}</h4>
            <p className="podcast__author">by {podcastDetail.artistName}</p>
            <hr />
            <h5>Description:</h5>
            <p>{podcastDetail.podcastDescription}</p>
          </aside>
        )}
        <section className="episodes">
          <h2 className="episodes__quantity">Episodes: {episodes.length}</h2>
          <div className="episodes__table__container">
            <table className="episodes__table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <EpisodesDataElement />
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default PodcastDetail;