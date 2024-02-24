import { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import Cookie from "js-cookie";
import "./index.css";

const Header = (props) => {
  const logout = () => {
    Cookie.remove("jwt_token");
    const { history } = props;
    history.replace("/login");
    window.location.reload();
  };

  return (
    <div className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        className="header-website-logo"
      />
      <ul className="header-list">
        <li className="header-list-item">
          <a href="/home" className="nav-item">
            Home
          </a>
        </li>
        <li className="header-list-item">
          <a href="/jobs" className="nav-item">
            Jobs
          </a>
        </li>
      </ul>
      <button className="btn btn-primary logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default withRouter(Header);
