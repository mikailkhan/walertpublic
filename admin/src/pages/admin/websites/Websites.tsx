import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import WebsiteTableRow from "./WebsiteTableRow";
import { getWebsites } from "../../../services/api";

const Websites = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWebsites();
      setWebsites(data);
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
            <th scope="col">Delete?</th>
            <th scope="col">Website</th>
            <th scope="col">Status</th>
            <th scope="col">Scraper Module</th>
          </tr>
        </thead>
        <tbody>
          <WebsiteTableRow websites={websites} />
        </tbody>
      </table>
    </>
  );
};

export default Websites;
