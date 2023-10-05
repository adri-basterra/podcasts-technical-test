import React from "react";
import "./PodcastPreview.styles.scss";

function PodcastPreview({ title, author, image }) {
  return (
    <article className="podcast-card">
      <img alt="" src={image} className="podcast-card__image" />
      <h4 className="podcast-card__title">{title}</h4>
      <p className="podcast-card__author">Author: {author}</p>
    </article>
  );
}

export default PodcastPreview;
