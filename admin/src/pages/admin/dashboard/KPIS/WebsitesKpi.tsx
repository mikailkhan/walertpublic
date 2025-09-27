import React from "react";

const Websites = ({
  supportedWebsitesCount,
  supportedWebsitesActiveCount,
  supportedWebsitesNonActiveCount,
}: {
  supportedWebsitesCount: number;
  supportedWebsitesActiveCount: number;
  supportedWebsitesNonActiveCount: number;
}) => {
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
                <span className="fw-bold text-primary me-2">
                  Supported Websites:{" "}
                </span>
                {supportedWebsitesCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">Active: </span>
                {supportedWebsitesActiveCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">Non-Active: </span>
                {supportedWebsitesNonActiveCount}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Websites;
