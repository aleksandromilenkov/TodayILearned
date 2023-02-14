import React from "react";
import "./Header.css";
const Header = (props) => {
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>Today I Learned</h1>
      </div>

      <button className="btn btn-large openForm" onClick={props.onShareFact}>
        {props.formIsShowed ? "Close" : "Share a fact"}
      </button>
    </header>
  );
};

export default Header;
