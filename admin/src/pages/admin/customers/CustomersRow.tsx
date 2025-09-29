type CustomersRowType = {
  customers: {
    userId: number;
    fullName: string;
    number: string;
    createdAt: string;
    scraperCurrentLimit: string;
    scraperTotalLimit: string;
  }[];
};

const CustomersRow = ({ customers }: CustomersRowType) => {
  return (
    <>
      {customers.map((val, index) => {
        return (
          <tr key={val.userId}>
            <th scope="row">{index + 1}</th>
            <td>
              <button className="btn btn-close"></button>
            </td>
            <td>{new Date(val.createdAt).toDateString()}</td>
            <td>{val.fullName}</td>
            <td>{val.number}</td>
            <td>{val.scraperCurrentLimit}</td>
            <td>{val.scraperTotalLimit}</td>
          </tr>
        );
      })}
    </>
  );
};

export default CustomersRow;
