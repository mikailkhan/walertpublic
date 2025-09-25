import OverallPerformance from "./KPIS/OverallPerformance";
import Requests from "./KPIS/Requests";
import TotalErrors from "./KPIS/TotalErrors";
import Websites from "./KPIS/Websites";

const Dashboard = () => {
  return (
    <section className="my-2">
      <div className="row">
        <OverallPerformance />
        <Websites />
        <Requests />
        <TotalErrors />
      </div>
    </section>
  );
};

export default Dashboard;

// Features to implement
// Sent Message
// Deleted Message
// Errors
// Registered Users (count)
//
