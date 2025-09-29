import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import SentRows from "./MessageRows";
import { getAllMessages } from "../../../services/api";

const Sent = () => {
  const [sents, setSents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMessages(true);
      setSents(response);
    };

    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Sent At</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Type</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          <SentRows messages={sents} />
        </tbody>
      </table>
    </>
  );
};

export default Sent;
