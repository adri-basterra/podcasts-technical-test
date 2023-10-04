import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as Utils from "../../../domain/utils/utils";
import EpisodeDetail from "../../components/EpisodeDetail/EpisodeDetail";
import { PodcastService } from "../../services/Podcast.service";

import "./PodcastDetail.styles.scss";

function PodcastDetail() {
  const { id, episodeId } = useParams();

  const [podcastDetail, setPodcastDetail] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [episodeDetail, setEpisodeDetail] = useState({});

  useEffect(() => {
    PodcastService.getPodcastDetail(id).then((response) => {
      const { podcast, episodeList } = response;
      if (episodeId) findEpisode(episodeId, episodeList);
      setPodcastDetail(podcast);
      setEpisodes(episodeList);
    });
  }, []);

  function findEpisode(id, episodes) {
    const episode = episodes.find((episode) => episode.trackId == id);
    setEpisodeDetail(episode);
  }

  const EpisodesDataElement = () => {
    return episodes.map((episode) => {
      const { trackId, trackName, trackTimeMillis, releaseDate } = episode;
      const timeInClockTime = Utils.milisecondsToClockMinutes(trackTimeMillis);
      const date = new Date(releaseDate ?? "").toLocaleDateString();

      return (
        <tr key={trackId}>
          <td>
            <Link to={`/podcast/${id}/episode/${trackId}`}>{trackName}</Link>
          </td>
          <td>{date}</td>
          <td>{timeInClockTime}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="podcast__container">
        {podcastDetail && (
          <aside className="podcast">
            <Link to={`/podcast/${id}`} className="podcast__link">
              <img
                className="podcast__image"
                src={podcastDetail.artworkUrl600}
              />
              <hr />
              <h4 className="podcast__title">{podcastDetail.collectionName}</h4>
              <p className="podcast__author">by {podcastDetail.artistName}</p>
            </Link>
            <hr />
            <h5>Description:</h5>
            <p>{podcastDetail.podcastDescription}</p>
          </aside>
        )}
        <section className="episodes">
          {episodeId && episodeDetail ? (
            <EpisodeDetail
              title={episodeDetail.trackName}
              url={episodeDetail.previewUrl}
              desc={episodeDetail.description}
              type={`${episodeDetail.episodeContentType}/${episodeDetail.episodeFileExtension}`}
            />
          ) : (
            <>
              <h2 className="episodes__quantity">
                Episodes: {episodes.length}
              </h2>
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
            </>
          )}
        </section>
      </div>
    </>
  );
}

export default PodcastDetail;
