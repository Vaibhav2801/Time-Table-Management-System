import React from "react";

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
                      <div className="form-group mb-3">
                        <input
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          required=""
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-dark"
                        />
                      </div>
                      {/* <div className="custom-control custom-checkbox mb-3">
                        <input
                          id="customCheck1"
                          type="checkbox"
                          checked="false"
                          className="custom-control-input"
                        />
                        <label for="customCheck1" className="custom-control-label">
                          Remember password
                        </label>
                      </div> */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-block mb-2 rounded-pill shadow-sm"
                      >
                        Sign in
                      </button>
                    </form>
                    <p>
                      Need an account ? <a href="#signup">Sign Up</a>
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
