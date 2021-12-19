import React from "react";
import error from "../images/error.png";
import savetime from "../images/savetime.png";
import secure from "../images/secure.png";
export default function Navbar() {
  return (
    <div className="home">
      <div className="card container" style={{ opacity: "93%" }}>
        <div className="card-body">
          <h4 className="text-primary mb-3">Introduction</h4>
          <p>
            Scheduling or maintaining timetable of real-world proportions are
            likely to have considerable complexity. In order to reduce this
            risk, a better and reliable automatic solver without any manual
            intervention is needed. An effective timetable in Educational
            Management System helps educational institutions to create and
            modify timetables seamlessly with less or no manual intervention.
          </p>
          <h4 className="text-primary">Advantages</h4>
          <div className="card-group">
            <div className="card">
              <img
                className="card-img-top"
                src={savetime}
                alt="save time image"
                style={{ height: "21rem", width: "85%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Saves Time</h5>
                <hr />
                <p className="card-text">
                  Creating and managing a timetable is a complex task which
                  requires a lot of time and manual paper works. The complex
                  process of timetable creation and management can be automated
                  using an effective Time Table Management System.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src={error}
                alt="error image"
                style={{ height: "21rem", width: "101%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Less error</h5>
                <hr />
                <p className="card-text">
                  Paper-based manual timetable system is prone to human errors.
                  A small error in the timetable will disturb the working of the
                  whole institution. By installing a Time Table management
                  system, human errors can be reduced significantly.
                </p>
              </div>
            </div>
            <div className="card">
              <img
                className="card-img-top"
                src={secure}
                alt="secure image"
                style={{ height: "21rem", width: "100%" }}
              />
              <div className="card-body">
                <h5 className="card-title">Secure</h5>
                <hr />
                <p className="card-text">
                  In Paper-based timetable systems, the data are created and
                  store in the form of paper. This is vulnerable to disasters
                  and accidents which can cause data loss. A Time Table
                  Management System stores the timetable data digitally; which
                  protects the data from accidents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
