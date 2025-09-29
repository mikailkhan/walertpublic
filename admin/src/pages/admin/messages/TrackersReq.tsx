import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { getAllTrackersReq } from "../../../services/api";
import TrackersReqRows from "./TrackersReqRows";

const TrackersReq = () => {
  const [reqs, setReqs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTrackersReq();
      setReqs(data);
    };

    fetchData();
  });
  return (
    <>
      <Breadcrumb />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
          </tr>
        </thead>
        <tbody>
          <TrackersReqRows reqs={reqs} />
        </tbody>
      </table>
    </>
  );
};

export default TrackersReq;
