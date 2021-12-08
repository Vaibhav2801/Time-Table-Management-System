import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import { Link } from "react-router-dom";
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
                <a className="nav-link" href="/home">
                  <i className="fa fa-fw fa-home"></i> Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/classes">
                  <i className="fa fa-fw fa-clock-o"></i>Classes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleShow} href="#profile">
                  <i className="fa fa-fw fa-user"></i>Profile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* profile modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="profile">
            <div className="center">
              <div className="row">
                <p>
                  <b>Name : </b>Abhijeet Mishra
                </p>
              </div>
              <div className="row">
                <p>
                  <b>Email : </b>abc@abc.com
                </p>
              </div>
              <div className="row">
                <p>
                  <b>Contact : </b>+91 8833456783
                </p>
              </div>
              <div className="row">
                <p>
                  <b>Role : </b>Student
                </p>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Logout
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
