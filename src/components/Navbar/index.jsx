import React from "react";
import "./Navbar.scss";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbarMain">
      <h1>
        <Link to="/">Coin Rank</Link>
      </h1>
    </nav>
  );
}
