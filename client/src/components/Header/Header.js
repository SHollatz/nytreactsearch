import React from "react";
import "./Header.css";

const Header = (props) => (
  <div>
    <div className="header_content">
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">New York Times Search</a>
        <a className="navbar-brand" href={props.linkSearch}>
          Search
        </a>
        <a className="navbar-brand" href="/">
          Saved
        </a>
      </nav>
    </div>
    <div id="main">
      <h1 id="main_title">React Mongo Search</h1>
      <h2 id="main_subtitle">New York Times Edition</h2>
    </div>
  </div>
);

export default Header;