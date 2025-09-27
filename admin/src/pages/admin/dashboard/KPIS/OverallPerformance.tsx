const OverallPerformance = ({
  userCount,
  messagesSentCount,
  messagesRecievedCount,
  trackersPlacedCount,
}: {
  userCount: number;
  messagesSentCount: number;
  messagesRecievedCount: number;
  trackersPlacedCount: number;
}) => {
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
                <span className="fw-bold text-primary me-2">Total Users:</span>
                {userCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">
                  Messages Sent:
                </span>
                {messagesSentCount}
              </li>
              <li className="card-text">
                <span className="fw-bold text-primary me-2">
                  Messages Recieved:
                </span>
                {messagesRecievedCount}
              </li>
              <li>
                <span className="fw-bold text-primary me-2">
                  Trackers Placed:
                </span>
                {trackersPlacedCount}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverallPerformance;
