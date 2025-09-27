import Breadcrumb from "../../components/Breadcrumb";
import OverallPerformance from "./KPIS/OverallPerformance";
import Requests from "./KPIS/Requests";
import TotalErrors from "./KPIS/TotalErrors";
import Websites from "./KPIS/WebsitesKpi";

const Dashboard = () => {
  return (
    <div className="row">
      <Breadcrumb />
      <OverallPerformance />
      <Websites />
      <Requests />
      <TotalErrors />
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
