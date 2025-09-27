const TotalErrors = ({
  errorsCount,
  errorsGeneralCount,
  errorsInvalidReqCount,
  errorsMessageNotSentCount,
  errorsScraperFailedCount,
  errorsTrackerNotDeletedCount,
  errorsUnsupportedSiteReqCount,
}: {
  errorsCount: number;
  errorsGeneralCount: number;
  errorsInvalidReqCount: number;
  errorsMessageNotSentCount: number;
  errorsScraperFailedCount: number;
  errorsTrackerNotDeletedCount: number;
  errorsUnsupportedSiteReqCount: number;
}) => {
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
                <span className="fw-bold text-primary me-2">
                  Total Errors Encountered:
                </span>
                {errorsCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">General: </span>
                {errorsGeneralCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">
                  Invalid Requests:{" "}
                </span>
                {errorsInvalidReqCount}
              </li>
              <li>
                <span className="fw-bold text-primary me-2">
                  Messages Sent Failures:
                </span>
                {errorsMessageNotSentCount}
              </li>
              <li>
                <span className="fw-bold text-primary me-2">
                  Scraper Failures:
                </span>
                {errorsScraperFailedCount}
              </li>
              <li>
                <span className="fw-bold text-primary me-2">
                  Trackers Deletion Failures:
                </span>
                {errorsTrackerNotDeletedCount}
              </li>
              <li>
                <span className="fw-bold text-primary me-2">
                  Unsupported Site Requests:
                </span>
                {errorsUnsupportedSiteReqCount}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalErrors;
