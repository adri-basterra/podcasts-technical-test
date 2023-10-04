import React from "react";

import "./EpisodeDetail.styles.scss";

function EpisodeDetail({ title, url, desc, type }) {
  return (
    <div className="episodeDetail">
      <h2 className="episodeDetail__title">{title}</h2>
      <p dangerouslySetInnerHTML={{ __html: desc ?? "" }} />
      <audio className="episodeDetail__audio" controls>
        <source src={url} type={type} />
      </audio>
    </div>
  );
}

export default EpisodeDetail;
