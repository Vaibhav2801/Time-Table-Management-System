import React, { useState } from "react";
import axios from "axios";

export default function ScheduleClass() {
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const onChangeTeacher = (e) => {
    setTeacher(e.target.value);
  };
  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };
  const onChangeEndTime = (e) => {
    setEndTime(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (
      teacher === "" ||
      date === "" ||
      subject === "" ||
      starttime === "" ||
      endtime === ""
    ) {
      alert("Please fill  all the details");
    } else {
      axios
        .post("/create", {
          date: date,
          sub: subject,
          teacher_name: teacher,
          start_time: starttime,
          end_time: endtime,
        })
        .then((res) => {
          alert("Class Scheduled");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setDate("");
    setTeacher("");
    setSubject("");
    setStartTime("");
    setEndTime("");
  };
  return (
    <>
      <div className="container schedule">
        <div className="card mx-auto">
          <div className="card-header">
            <h4>Schedule Class</h4>
          </div>
          <div className="card-body">
            <small className="text-muted ms-2">
              Please fill all the details to schedule a class.
            </small>
            <br />
            <form
              // autocomplete="off"
              onSubmit={onSubmitForm}
              className="container"
            >
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="adddate"
                  placeholder="Enter Date"
                  value={date}
                  onChange={onChangeDate}
                />
              </div>
              <div className="form-group">
                <label>Teacher</label>
                <input
                  type="text"
                  className="form-control"
                  id="addteacher"
                  placeholder="Enter Teacher's Name"
                  value={teacher}
                  onChange={onChangeTeacher}
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="addsubject"
                  placeholder="Enter Subject's Name"
                  value={subject}
                  onChange={onChangeSubject}
                />
              </div>
              <div className="row">
                <div className="col">
                  {" "}
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="addstarttime"
                      placeholder="Start Time"
                      value={starttime}
                      onChange={onChangeStartTime}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>End Time</label>
                    <input
                      type="time"
                      className="form-control"
                      id="addendtime"
                      placeholder="End Time"
                      value={endtime}
                      onChange={onChangeEndTime}
                    />
                  </div>
                </div>
              </div>
              <div className="submitschedule">
                <button type="submit" className="btn btn-primary btn-md hover">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
