import React from "react";
import { Link } from "react-router-dom";

import "./Header.styles.scss";

function Header() {
  const HOME_ROUTE = "/";
  const PAGE_TITLE = "Podcaster";

  return (
    <div className="header">
      <Link className="header__link" to={HOME_ROUTE}>
        <h2 className="header__title">{PAGE_TITLE}</h2>
      </Link>
    </div>
  );
}

export default Header;
