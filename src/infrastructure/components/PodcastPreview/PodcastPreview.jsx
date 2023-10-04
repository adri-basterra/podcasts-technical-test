import React from "react";
import "./PodcastPreview.styles.scss";

function PodcastPreview({ title, author, image }) {
  return (
    <article className="podcast-card">
      <img alt="" src={image} className="podcast-card__image" />
      <h2 className="podcast-card__title">{title}</h2>
      <span className="podcast-card__author">Author: {author}</span>
    </article>
  );
}

export default PodcastPreview;
