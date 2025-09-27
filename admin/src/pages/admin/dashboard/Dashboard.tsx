import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import OverallPerformance from "./KPIS/OverallPerformance";
import Requests from "./KPIS/Requests";
import TotalErrors from "./KPIS/TotalErrors";
import Websites from "./KPIS/WebsitesKpi";
import { getDashboard } from "../../../services/api";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [messagesSentCount, setMessagesSentCount] = useState(0);
  const [messagesRecievedCount, setMessagesRecievedCount] = useState(0);
  const [trackersPlacedCount, setTrackersPlacedCount] = useState(0);
  const [supportedWebsitesCount, setSupportedWebsitesCount] = useState(0);
  const [supportedWebsitesActiveCount, setSupportedWebsitesActiveCount] =
    useState(0);
  const [supportedWebsitesNonActiveCount, setSupportedWebsitesNonActiveCount] =
    useState(0);
  const [moreTrackersRequestsCount, setMoreTrackersRequestsCount] = useState(0);
  const [errorsCount, setErrorsCount] = useState(0);
  const [errorsGeneralCount, setErrorsGeneralCount] = useState(0);
  const [errorsInvalidReqCount, setErrorsInvalidReqCount] = useState(0);
  const [errorsMessageNotSentCount, setErrorsMessageNotSentCount] = useState(0);
  const [errorsScraperFailedCount, setErrorsScraperFailedCount] = useState(0);
  const [errorsTrackerNotDeletedCount, setErrorsTrackerNotDeletedCount] =
    useState(0);
  const [errorsUnsupportedSiteReqCount, setErrorsUnsupportedSiteReqCount] =
    useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getDashboard();

        setUserCount(data.usersCount);
        setMessagesSentCount(data.messagesSentCount);
        setMessagesRecievedCount(data.messagesRecievedCount);

        setTrackersPlacedCount(data.trackersPlacedCount);
        setSupportedWebsitesCount(data.supportedWebsitesCount);
        setSupportedWebsitesActiveCount(data.supportedWebsitesActiveCount);
        setSupportedWebsitesNonActiveCount(
          data.supportedWebsitesNonActiveCount
        );
        setMoreTrackersRequestsCount(data.moreTrackersRequestsCount);

        setErrorsCount(data.errorsCount);
        setErrorsGeneralCount(data.errorsGeneralCount);
        setErrorsInvalidReqCount(data.errorsInvalidReqCount);
        setErrorsMessageNotSentCount(data.errorsMessageNotSentCount);
        setErrorsScraperFailedCount(data.errorsScraperFailedCount);
        setErrorsTrackerNotDeletedCount(data.errorsTrackerNotDeletedCount);
        setErrorsUnsupportedSiteReqCount(data.errorsUnsupportedSiteReqCount);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        // Optionally, set some fallback values or error state
      }
    }

    fetchData();
  }, []);
  return (
    <div className="row">
      <Breadcrumb />
      <OverallPerformance
        userCount={userCount}
        messagesSentCount={messagesSentCount}
        messagesRecievedCount={messagesRecievedCount}
        trackersPlacedCount={trackersPlacedCount}
      />
      <Websites
        supportedWebsitesCount={supportedWebsitesCount}
        supportedWebsitesActiveCount={supportedWebsitesActiveCount}
        supportedWebsitesNonActiveCount={supportedWebsitesNonActiveCount}
      />
      <Requests moreTrackersRequestsCount={moreTrackersRequestsCount} />
      <TotalErrors
        errorsCount={errorsCount}
        errorsGeneralCount={errorsGeneralCount}
        errorsInvalidReqCount={errorsInvalidReqCount}
        errorsMessageNotSentCount={errorsMessageNotSentCount}
        errorsScraperFailedCount={errorsScraperFailedCount}
        errorsTrackerNotDeletedCount={errorsTrackerNotDeletedCount}
        errorsUnsupportedSiteReqCount={errorsUnsupportedSiteReqCount}
      />
    </div>
  );
};

export default Dashboard;

// Features to implement
// Sent Message
// Deleted Message
// Errors
// Registered Users (count)
//
