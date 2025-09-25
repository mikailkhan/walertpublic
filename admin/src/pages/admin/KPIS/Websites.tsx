import React from "react";

const Websites = () => {
  return (
    <>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">🖥️ Websites</h1>
            <h5 className="card-subtitle">
              <hr />
            </h5>
            <ul className="mt-2">
              <li className="card-text">
                <span className="fw-bold text-primary">Supported Websites</span>
                : 10
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">Active</span>: 10
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary">Non-Active</span>: 10
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Websites;
