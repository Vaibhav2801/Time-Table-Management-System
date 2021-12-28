import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import axios from "axios";
export default function Classes() {
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loginData") ? true : false
  );
  const [classlist, setClasslist] = useState([]);
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [date, setDate] = useState("");
  const [starttime, setStartTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [num, setNum] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = (singleclass) => {
    setNum(singleclass.num);
    setSubject(singleclass.sub);
    setTeacher(singleclass.teacher_name);
    setStartTime(singleclass.start_time);
    setEndTime(singleclass.end_time);
    setIsOpen(true);
  };
  const closeModal = () => setIsOpen(false);
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
  const onUpdateForm = (e) => {
    e.preventDefault();
    if (
      teacher === "" ||
      date === "" ||
      subject === "" ||
      starttime === "" ||
      endtime === ""
    ) {
      alert("Please fill all the details");
    } else {
      axios
        .put("/update/" + num, {
          date: date,
          sub: subject,
          teacher_name: teacher,
          start_time: starttime,
          end_time: endtime,
        })
        .then((res) => {
          alert("Class Rescheduled");
          setDate("");
          setTeacher("");
          setSubject("");
          setStartTime("");
          setEndTime("");
          setIsOpen(false);
          getclasses();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    getclasses();
  }, []);
  useEffect(() => {
    if (localStorage.getItem("loginData")) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localStorage.getItem("loginData")]);
  const getclasses = () => {
    axios
      .get("/getclasses")
      .then((res) => {
        console.log(res.data);
        setClasslist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDelete = (num) => {
    axios
      .delete("/delete/" + num)
      .then((res) => {
        console.log(res);
        alert("Cancel this Class ?");
        getclasses();
      })
      .catch((err) => {
        console.log(err);
      });
    getclasses();
  };
  return (
    <>
      <div className="container classes">
        <div className="card mx-auto">
          <div className="card-header">
            <h4>Time Table</h4>
          </div>
          <div className="card-body">
            {classlist.length === 0 ? (
              <p className="text-center text-muted">
                Currently no classes are scheduled!
              </p>
            ) : (
              <div
                className="container-fluid"
                style={{ overflow: "auto", height: "500px" }}
              >
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Teacher</th>
                      <th scope="col">Starts at</th>
                      <th scope="col">Ends at</th>
                      <th scope="col">Admin</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classlist.map((singleclass) => (
                      <tr>
                        <td>{moment(singleclass.date).format("YYYY-MM-DD")}</td>
                        <td>{singleclass.sub}</td>
                        <td>{singleclass.teacher_name}</td>
                        <td>{singleclass.start_time}</td>
                        <td>{singleclass.end_time}</td>
                        {loginData? (<td>{loginData.email}</td>):(<td>Admin Not Found</td>)}
                        <td>
                          <button
                            className="btn btn-sm btn-danger ms-2"
                            onClick={() => handleDelete(singleclass.num)}
                            disabled={!isLoggedIn}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-sm btn-success ms-2"
                            onClick={() => openModal(singleclass)}
                            disabled={!isLoggedIn}
                          >
                            Update
                          </button>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* modal for update class */}
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header style={{ backgroundColor: "#cc5500" }}>
          <h5 style={{ color: "white" }}>Reschedule Class</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="updateform">
            <form onSubmit={onUpdateForm} className="container">
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
              <button
                type="submit"
                className="btn btn-sm btn-secondary"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-sm btn-primary"
                style={{ float: "right" }}
              >
                Submit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
