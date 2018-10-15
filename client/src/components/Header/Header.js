import React from "react";
import "./Header.css";

const Header = () => (
  <div>
    <div className="header_content">
      <h1 id="header_title">New York Times Search</h1>
    </div>
    <div id="main">
      <h1 id="main_title">React Mongo Scraper</h1>
      <h2 id="main_subtitle">New York Times Edition</h2>
      <h3 id="main_description"><i>Keep Notes with a Click on an Article</i></h3>
    </div>
  </div>
);

export default Header;