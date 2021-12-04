import React from "react";
export default function Navbar() {
  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5>About TTMS</h5>
          <section>
            Scheduling or maintaining timetable of real-world proportions are
            likely to have considerable complexity. In order to reduce this
            risk, a better and reliable automatic solver without any manual
            intervention is needed. An effective timetable in Educational
            Management System helps educational institutions to create and
            modify timetables seamlessly with less or no manual intervention.
          </section>
          <hr />
          <h5>Advantages of TTMS</h5>
          <div>
            <h6>Saves Time</h6>
            <p>
              Creating and managing a timetable is a complex task which requires
              a lot of time and manual paper works. The complex process of
              timetable creation and management can be automated using an
              effective Educational Management System with timetable module.
            </p>
            <h6>Less error</h6>
            <p>
              Paper-based manual timetable system is prone to human errors. A
              small error in the timetable will disturb the working of the whole
              institution. By installing an education management system with
              timetable module, human errors can be reduced significantly.
            </p>
            <h6>Customization and flexibility</h6>
            <p>
              An effective timetable management system offers high flexibility
              and customization. It can support any institution irrespective of
              the size, location or language.
            </p>
            <h6>Secure</h6>
            <p>
              In Paper-based timetable systems, the data are created and store
              in the form of paper. This is vulnerable to disasters and
              accidents. This results in loss of data. Education Management
              System stores the timetable data digitally; which protects the
              data from accidents. All the data of the educational management
              system are stored in highly effective cloud servers, which will
              prevent the theft of digital data.
            </p>
            <h6>User-friendly</h6>
            <p>
              Anybody without technical knowledge can use this software
              seamlessly.
            </p>
          </div>
        </div>
      </div>
      {/* <footer className="bg-light text-center">
        <div className="text-center p-3">
          <b>© 2021 Copyright, Developed by Group-9</b>
        </div>
      </footer> */}
    </>
  );
}
