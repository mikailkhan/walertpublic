import React from "react";

const OverallPerformance = () => {
  return (
    <>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">👤 Overall Performance</h1>
            <h5 className="card-subtitle">
              <hr />
            </h5>
            <ul className="mt-2">
              <li className="card-text">
                <span className="fw-bold text-primary">Total Users</span>: 200
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">Messages Sent</span>:
                1200
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">Messages Recieved</span>:
                900
              </li>
              <li>
                <span className="fw-bold text-primary">Trackers Placed</span>:
                100
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallPerformance;
