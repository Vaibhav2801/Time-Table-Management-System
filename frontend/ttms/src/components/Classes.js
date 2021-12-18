import React, { useState, useEffect } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import axios from "axios";

export default function Classes() {
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
      alert("Please fill  all the details");
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
      <div className="card container">
        <div className="card-body">
          <h5>List of Classes</h5>
          {classlist.length === 0 ? (
            <p>Currently no classes are scheduled!</p>
          ) : (
            <div
              className="classlist container-fluid"
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
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(singleclass.num)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => openModal(singleclass)}
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

      {/* modal for update class */}
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header>
          <Modal.Title>Reschedule Class</Modal.Title>
          <i
            className="fa fa-times"
            onClick={closeModal}
            style={{ fontSize: "28px" }}
          ></i>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onUpdateForm} className="container">
            <div className="form-group">
              <label>Date (dd/mm/yyyy)</label>
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
                placeholder="Enter Subject"
                value={subject}
                onChange={onChangeSubject}
              />
            </div>
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
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              style={{ float: "right" }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
