import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

export default function Navbar() {
  // states for login
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );
  // states for modal
  const [show, setShow] = useState(false);
  // sign in functions
  const handleFailure = (res) => {
    alert(res);
  };
  const handleLogin = async (googleData) => {
    // console.log(googleData);
    const res = await fetch("/api/google-login", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem("loginData", JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
  };
  // modal functions
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
                  <i className="fa fa-fw fa-sign-in"></i>Log In
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* profile modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#cc5500" }}>
          <h5 style={{ color: "white" }}>Login</h5>
        </Modal.Header>
        <Modal.Body>
          {loginData ? (
            <div className="profile">
              <div className="user">
                <img src={loginData.imageUrl} alt="user"></img>
              </div>
              <div className="text-center">
                <p>
                  <b>Name : </b>
                  {loginData.name}
                </p>
                <p>
                  <b>Email: </b>
                  {loginData.email}
                </p>
              </div>
              <button
                type="button"
                className="btn btn-sm btn-danger"
                style={{ float: "right" }}
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          ) : (
            <div>
              <p className="text-muted">Please Log in to continue.</p>
              <GoogleLogin
                clientId="1017366883273-4j5q51kqd0sh1nc95bpbs5dh983f6el3.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
