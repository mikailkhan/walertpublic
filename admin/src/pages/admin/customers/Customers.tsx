import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import CustomersRow from "./CustomersRow";
import { getCustomers } from "../../../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCustomers();
      setCustomers(data);
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
            <th scope="col">Remove?</th>
            <th scope="col">Created At</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Active Scrapers</th>
            <th scope="col">Scrapers Limit</th>
          </tr>
        </thead>
        <tbody>
          <CustomersRow customers={customers} />
        </tbody>
      </table>
    </>
  );
};

export default Customers;
