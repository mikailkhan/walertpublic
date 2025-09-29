import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { addWebsite } from "../../../services/api";

const Add = () => {
  const [website, setWebsite] = useState("");
  const [nameSelector, setNameSelector] = useState("");
  const [priceSelector, setPriceSelector] = useState("");
  const [domain, setDomain] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [module, setModule] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await addWebsite(website, priceSelector, nameSelector);
    setSuccess(response.success);
    if (response.success) {
      setDomain(response.domain);
      setPrice(response.price);
      setName(response.name);
      setModule(response.module);
    } else {
      setErrorMessage(response.errorMessage);
    }
  };

  useEffect(() => {}, [success]);

  return (
    <div>
      <Breadcrumb />
      <div className="card p-4">
        <h3 className="mb-4 text-center">Add New Website</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Price Selector"
              value={priceSelector}
              onChange={(e) => setPriceSelector(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name Selector"
              value={nameSelector}
              onChange={(e) => setNameSelector(e.target.value)}
              required
            />
          </div>

          <div className="d-grid">
            <div className={success && "alert alert-success"}>
              {success && (
                <>
                  <p>✅ {domain} was added.</p>
                  <ul>
                    <li>Link: {website}</li>
                    <li>Product: {name}</li>
                    <li>Price: {price}</li>
                    <li>Module: {module}</li>
                  </ul>
                </>
              )}
            </div>

            {success === false && (
              <ul className="alert alert-danger p-4">
                <li>{errorMessage}</li>
              </ul>
            )}

            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
