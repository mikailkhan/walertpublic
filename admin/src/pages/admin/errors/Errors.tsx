import Breadcrumb from "../../components/Breadcrumb";
import { getErrors } from "../../../services/api";
import { useEffect, useState } from "react";
import TableRow from "./TableRow";

const Errors = () => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getErrors();
      setErrors(data);
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
            <th scope="col">Type</th>
            <th scope="col">Official Message</th>
            <th scope="col">Custom Message</th>
          </tr>
        </thead>
        <tbody>
          <TableRow errors={errors} />
        </tbody>
      </table>
    </>
  );
};

export default Errors;
