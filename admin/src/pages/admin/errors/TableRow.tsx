import type { TableRowProps } from "./TableRowPropsType";

const TableRow = ({ errors }: TableRowProps) => {
  return (
    <>
      {errors.map((val, index) => (
        <tr key={val.errorId}>
          <th scope="row">{index + 1}</th>
          <td>
            <button className="btn btn-close text-danger"></button>
          </td>
          <td>{val.type}</td>
          <td>{val.officialErrorMessage}</td>
          <td>{val.customErrorMessage}</td>
        </tr>
      ))}
    </>
  );
};

export default TableRow;
