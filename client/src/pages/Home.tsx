import { useState } from "react";
import { MdProductionQuantityLimits } from "react-icons/md";
import { isURL } from "../util/Util";
import { FaFeather, FaWhatsapp } from "react-icons/fa";

import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
} from "react-icons/tb";
import { FaDownLong } from "react-icons/fa6";

const Home = () => {
  const [productUrl, setProductUrl] = useState("");
  const [isCorrectUrl, setisCorrectUrl] = useState(false);
  const numberForURL = "15551578685";
  const numberForFront = "+92 335 2501007";

  const handleProductUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setProductUrl(event.target.value);
    setisCorrectUrl(isURL(url));
  };

  const handleButtonClick = () => {
    // Replace 'https://www.example.com' with the desired URL
    window.open(
      `https://wa.me/${numberForURL}?text=${productUrl}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <section id="main-header">
        <div className="container-fluid">
          <div className="row mb-5">
            <h1 className="text-center display-3">WAlert</h1>
            <p className="lead text-center font-monospace">
              Get instant product price updates sent straight to your
              <span className="text-success fw-bold"> WhatsApp</span>! 🚀
            </p>
          </div>

          <div className="row">
            <div className="col-md-4 mx-auto">
              <img
                src="/home.png"
                alt="walert"
                className="rounded shadow-lg img-fluid d-block"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="product">
        <div className="container">
          <form>
            <div className="row mt-5">
              <div className="col-md-5 mx-auto">
                <div className="input-group">
                  <span className="input-group-text">
                    <MdProductionQuantityLimits />
                  </span>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="product-input"
                      placeholder="Enter Product URL"
                      value={productUrl}
                      onChange={handleProductUrl}
                    />

                    <label htmlFor="product-input">
                      Enter Product URL (https://example.com)
                    </label>
                  </div>

                  <button
                    onClick={handleButtonClick}
                    className={`btn ${
                      isCorrectUrl ? `btn-success` : `btn-secondary bg-grey`
                    }`}
                    disabled={!isCorrectUrl}
                  >
                    <FaWhatsapp className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="container">
          <div className="row my-5">
            <h2 className="display-6 text-muted text-center">OR</h2>
            <small className="text-muted text-center">
              Just send us the product link on WhatsApp ({numberForFront}) and
              we'll start tracking it for you! ⚡
            </small>
          </div>
        </div>
      </section>

      <section id="guide" className="bg-primary text-white my-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-7 mx-auto my-4 p-2">
              <h2 className="display-5 text-center">
                Step by Step Process to Track Price
              </h2>
            </div>
            <div className="row mx-0">
              <div className="col-md-6 mb-3 mx-auto">
                <div className="card ">
                  <div className="card-body text-center">
                    <h5 className="card-title mb-4">
                      <TbCircleNumber1Filled className="text-primary" />
                    </h5>
                    <p className="card-text m-0">
                      Simply send us a WhatsApp message with the product URL
                      link.
                    </p>
                    <small className="text-muted fst-italic">
                      For example: https://www.example.com/product/12345
                    </small>
                  </div>
                </div>
              </div>
              <FaDownLong className="mx-auto my-3 text-white " />
            </div>

            <div className="row mx-0">
              <div className="col-md-6 mx-auto mb-3">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title mb-4">
                      <TbCircleNumber2Filled className="text-primary" />
                    </h5>
                    <p className="card-text m-0">
                      And we'll start tracking it for you.
                    </p>
                    <small className="text-muted fst-italic">
                      <FaFeather />
                    </small>
                  </div>
                </div>
              </div>
              <FaDownLong className="mx-auto my-3 text-white " />
            </div>

            <div className="row mx-0">
              <div className="col-md-6 mx-auto mb-3">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title mb-4">
                      <TbCircleNumber3Filled className="text-primary" />
                    </h5>
                    <p className="card-text m-0">
                      As soon as the product price drops, you'll get an instant
                      notification directly on your WhatsApp.
                    </p>
                    <small className="text-muted fst-italic">
                      <FaFeather />
                    </small>
                  </div>
                </div>
              </div>
              <FaDownLong className="mx-auto my-3 text-white " />
            </div>

            <div className="row mx-0">
              <div className="col-md-6 mx-auto mb-3">
                <div className="card">
                  <div className="card-body text-center">
                    <h5 className="card-title mb-4">Want Help?</h5>
                    <p className="card-text m-0">
                      Need help? Just send us a WhatsApp message with the word
                      <span className="fw-bold"> 'menu'</span> to see all
                      available options—like viewing or deleting your tracker.
                    </p>
                    <small className="text-muted fst-italic">
                      <FaFeather />
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cta">
        <div className="container">
          <div className="row mx-0">
            <div className="col-md-6 py-12 text-white border p-5 border-success bg-success rounded shadow mx-auto my-5">
              <div className="max-w-4xl px-6 text-center">
                <h2 className="text-2xl font-bold">
                  Ready to save on your next purchase?
                </h2>
                <p className="mt-2 text-gray-700">
                  Send the product link to our WhatsApp and we'll start tracking
                  it for you right away.
                </p>

                <div className="mt-6 flex justify-center">
                  <a
                    href={`https://wa.me/${numberForURL}`}
                    className="inline-block rounded-2xl px-6 py-3 btn btn-primary text-white font-medium shadow"
                    target="_blank"
                  >
                    Message us on WhatsApp
                  </a>
                </div>

                <p className="mt-4 text-sm text-gray-600">
                  Phone: {numberForFront}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
