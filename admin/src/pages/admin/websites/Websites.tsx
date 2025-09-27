import Breadcrumb from "../../components/Breadcrumb";

const Websites = () => {
  return (
    <>
      <Breadcrumb />
      <div className="col-md-6">
        <form className="row">
          <div className="col-auto">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Add Website
            </label>
            <input
              type="text"
              className="form-control"
              id="inputPassword2"
              placeholder="Add Website"
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-3">
              Add
            </button>
          </div>
        </form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Active</th>
            <th scope="col">Created At</th>
            <th scope="col">Website</th>
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

export default Websites;
