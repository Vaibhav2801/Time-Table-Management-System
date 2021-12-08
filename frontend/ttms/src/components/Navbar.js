import React from "react";
export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Time Table Management System
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/home">
                  <i className="fa fa-fw fa-home"></i> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/classes">
                  <i className="fa fa-fw fa-book"></i>Classes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">
                  <i className="fa fa-fw fa-user"></i>Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
