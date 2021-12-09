import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-4 my-4">Welcome!</h3>
                    <form>
                      Email
                      <div className="form-group mb-3">
                        <input
                          id="inputEmail"
                          type="email"
                          placeholder="Email address"
                          required=""
                          autofocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      Password
                      <div className="form-group mb-3">
                        <input
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          required=""
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-dark"
                        />
                      </div>
                      <div className="form-check-inline">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label
                          className="form-check-label ms-2"
                          for="flexRadioDefault1"
                        >
                          Teacher
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <input
                          className="form-check-input mt-1"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <label
                          className="form-check-label ms-2"
                          for="flexRadioDefault2"
                        >
                          Student
                        </label>
                      </div>
                    </form>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-4 mb-3 rounded-pill shadow-sm"
                    >
                      Sign in
                    </button>
                    <p>
                      Need an account ? <Link to="/register">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
