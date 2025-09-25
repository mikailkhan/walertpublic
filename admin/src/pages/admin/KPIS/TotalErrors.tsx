import React from "react";

const TotalErrors = () => {
  return (
    <>
      <div className="col-md-4 mt-3">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">⛔️ Errors</h1>
            <h5 className="card-subtitle">
              <hr />
            </h5>
            <ul className="mt-2">
              <li className="card-text">
                <span className="fw-bold text-primary">Errors Encountered</span>
                : 50
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">Scraper Failed</span>: 10
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">
                  Messages Sent Failures
                </span>
                : 10
              </li>
              <li>
                <span className="fw-bold text-primary">
                  Messages Recieved Failures
                </span>
                : 1
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalErrors;
