import React from "react";

import "./NotFound.styles.scss";

function NotFound({ element }) {
  const IMAGE404_SOURCE =
    "https://st2.depositphotos.com/1007989/9405/i/450/depositphotos_94050766-stock-illustration-error-404-notice-for-websites.jpg";

  return (
    <div className="notFound">
      <h2 className="notFound__title">{element ?? ""} not found</h2>
      <img className="notFound__image" alt="" src={IMAGE404_SOURCE} />
      <p></p>
    </div>
  );
}

export default NotFound;
