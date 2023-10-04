import React from "react";
import "./Header.styles.scss";

function Header() {
  const PAGE_TITLE = "Podcaster";

  return (
    <div className="header">
      <h2 className="header__title">{PAGE_TITLE}</h2>
    </div>
  );
}

export default Header;
