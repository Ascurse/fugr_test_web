import React from "react";
import "./Header.css";
import Search from "../Search/Search";

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <h1 className="header-title">Book Finder</h1>
        <div className="header__searchbar">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Header;
