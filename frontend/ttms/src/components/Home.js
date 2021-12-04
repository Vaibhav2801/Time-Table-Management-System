import React, { useState } from "react";
// import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
export default function Navbar() {
  //   const [showModal, setShow] = useState(false);

  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <h4
          className="navbar-brand"
          href="/"
          //   style={{
          //     color: "white",
          //     fontFamily: "inherit",
          //   }}
        >
          Time Table Management System
        </h4>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-navicon"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item hover-link">
              <a className="nav-link" href="/home" style={{ color: "white" }}>
                <i className="fa fa-fw fa-home"></i>Home
              </a>
            </li>
            <li className="nav-item hover-link">
              <a
                className="nav-link"
                href="/classes"
                style={{ color: "white" }}
              >
                <i className="fa fa-fw fa-book"></i>Classes
              </a>
            </li>
            <li className="nav-item hover-link">
              <a
                className="nav-link"
                href="/profile"
                style={{ color: "white" }}
              >
                <i className="fa fa-fw fa-user"></i>Profile
              </a>
            </li>
            {/* <li className="nav-item hover-link">
                <Link className="nav-link" onClick={handleShow} to="/login">
                  <i className="fa fa-fw fa-user"></i>Login
                </Link>
              </li> */}
          </ul>
        </div>
      </nav>

      {/* LOGIN MODAL
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
          <i
            className="fa fa-times"
            onClick={handleClose}
            style={{ fontSize: "28px" }}
          ></i>
        </Modal.Header>

        <Modal.Body>
          <form autocomplete="off" className="container">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter Password"
                required
              />
              <small style={{ float: "right" }}>
                Don't have a account yet?
                <a href="#">
                  <b> Register</b>
                </a>
              </small>
            </div>

            <br />
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal> */}
    </>
  );
}
