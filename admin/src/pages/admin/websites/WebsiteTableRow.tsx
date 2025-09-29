import type { WebsiteRows } from "./WebsiteRowType";

const WebsiteTableRow = ({ websites }: WebsiteRows) => {
  return (
    <>
      {websites.map((val, index) => {
        return (
          <tr key={val.websiteId}>
            <th scope="row">{index + 1}</th>
            <td>
              <button className="btn btn-close text-danger"></button>
            </td>
            <td>{val.website}</td>
            <td className={val.active ? "text-success" : "text-warning"}>
              {val.active ? "Active" : "Inactive"}
            </td>
            <td>{val.scraperModule}</td>
          </tr>
        );
      })}
    </>
  );
};

export default WebsiteTableRow;
