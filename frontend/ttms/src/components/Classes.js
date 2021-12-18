import React from "react";

export default function Classes() {
  return (
    <>
      <div className="card container">
        <div className="card-body">
          <h5>List of Classes</h5>
          <div className="classlist container-fluid">
            <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Teacher</th>
                  <th scope="col">Starts at</th>
                  <th scope="col">Ends at</th>
                  {/* only for teacher */}
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>07/12/2021</td>
                  <td>DBMS</td>
                  <td>Mrs. Aditi Sharma</td>
                  <td>10:00 AM</td>
                  <td>10:50 AM</td>
                  <td>
                    <button className="btn btn-danger">Cancel</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
