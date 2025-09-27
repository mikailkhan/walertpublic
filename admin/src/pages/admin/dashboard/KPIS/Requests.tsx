const Requests = ({
  moreTrackersRequestsCount,
}: {
  moreTrackersRequestsCount: number;
}) => {
  return (
    <>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title">📈 Tracker Requests</h1>
            <h5 className="card-subtitle">
              <hr />
            </h5>
            <ul className="mt-2">
              <li className="card-text">
                <span className="fw-bold text-primary me-2">
                  Total Requests for more Trackers:
                </span>
                {moreTrackersRequestsCount}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
