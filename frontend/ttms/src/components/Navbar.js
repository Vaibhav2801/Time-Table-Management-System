import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import usericon from "../images/usericon.png";
export default function Navbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                <Link className="nav-link" to="/home">
                  <i className="fa fa-fw fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/schedule">
                  <i className="fa fa-fw fa-calendar"></i>Schedule Class
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/classes">
                  <i className="fa fa-fw fa-clock-o"></i>Classes
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={handleShow} to="/profile">
                  <i className="fa fa-fw fa-user"></i>Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* profile modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#cc5500" }}>
          <h5 style={{ color: "white" }}>Profile</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="profile">
            <div className="user">
              <img src={usericon} alt="user"></img>
            </div>
            <div className="text-center">
              <p>
                <b>Name : </b>XYZ
              </p>
              <p>
                <b>Email: </b>xyz@xyz.com
              </p>
              <p>
                <b>Branch: </b>Information Technology
              </p>
              <p>
                <b>Designation:</b> Teacher
              </p>
            </div>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              style={{ float: "right" }}
              onClick={handleClose}
            >
              Logout
            </button>
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
