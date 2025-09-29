import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { getAllMessages } from "../../../services/api";
import MessageRows from "./MessageRows";

const Recieved = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllMessages(false);
      setMessages(response);
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
            <th scope="col">Recieved At</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Type</th>
            <th scope="col">Text</th>
          </tr>
        </thead>
        <tbody>
          <MessageRows messages={messages} />
        </tbody>
      </table>
    </>
  );
};

export default Recieved;
