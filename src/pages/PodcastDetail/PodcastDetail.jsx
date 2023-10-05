import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as Utils from "../../utils/utils";
import { EpisodeDetail, NotFound, Loading } from "../../components";
import { PodcastService } from "../../services/Podcast.service";

import "./PodcastDetail.styles.scss";

function PodcastDetail() {
  const NOT_FOUND = {
    podcast: "Podcast not found",
    episode: "Episode not found",
    page: "Page error encountered",
  };

  const { id, episodeId } = useParams();

  const [podcastDetail, setPodcastDetail] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [episodeDetail, setEpisodeDetail] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    PodcastService.getPodcastDetail(id)
      .then((response) => {
        const { podcast, episodeList } = response;
        if (episodeId) findEpisode(episodeId, episodeList);

        setPodcastDetail(podcast);
        setEpisodes(episodeList);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, episodeId]);

  function findEpisode(id, episodes) {
    setLoading(true);
    const episode = episodes.find(
      (episode) => parseInt(episode.trackId) === parseInt(id)
    );
    setEpisodeDetail(episode);
    setLoading(false);
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

  if (loading) return <Loading />;
  if (error) return <NotFound element={NOT_FOUND.page} />;

  return (
    <div className="podcast__container">
      {podcastDetail ? (
        <>
          <aside className="podcast">
            <Link to={`/podcast/${id}`} className="podcast__link">
              <img
                alt=""
                className="podcast__image"
                src={podcastDetail.artworkUrl600}
              />
              <hr />
              <h4 className="podcast__title">{podcastDetail.collectionName}</h4>
              <p className="podcast__author">by {podcastDetail.artistName}</p>
            </Link>
            <hr />
            <h5 className="podcast__desc__title">Description:</h5>
            {/* FIXME: no description was found in podcastDetail object */}
            <p className="podcast__desc">{podcastDetail.primaryGenreName}</p>
          </aside>
          <section className="episodes">
            {episodeId ? (
              episodeDetail ? (
                <EpisodeDetail
                  title={episodeDetail.trackName}
                  url={episodeDetail.previewUrl}
                  desc={episodeDetail.description}
                  type={`${episodeDetail.episodeContentType}/${episodeDetail.episodeFileExtension}`}
                />
              ) : (
                <NotFound element={NOT_FOUND.episode} />
              )
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
        </>
      ) : (
        <NotFound element={NOT_FOUND.podcast} />
      )}
    </div>
  );
}

export default PodcastDetail;
