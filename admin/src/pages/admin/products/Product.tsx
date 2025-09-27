import Breadcrumb from "../../components/Breadcrumb";

const Product = () => {
  return (
    <>
      <Breadcrumb />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Created At</th>
            <th scope="col">Last Scraped</th>
            <th scope="col">Name</th>
            <th scope="col">Number</th>
            <th scope="col">Website</th>
            <th scope="col">Product</th>
            <th scope="col">Original Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>29/5/6</td>
            <td>Otto</td>
            <td>923378421008</td>
            <td className="text-success">Sent</td>
            <td>Hello</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>29/5/6</td>
            <td>Otto</td>
            <td className="text-success">Recieved</td>
            <td>Bye</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>John</td>
            <td>29/5/6</td>
            <td>Otto</td>
            <td>Sent</td>
            <td>Hello</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Product;
