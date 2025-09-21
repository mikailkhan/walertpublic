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

  const handleProductUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setProductUrl(event.target.value);
    setisCorrectUrl(isURL(url));
  };
  return (
    <>
      <section id="main-header">
        <div className="container-fluid">
          <div className="row mb-5">
            <h1 className="text-center display-3">Price Tracker</h1>
            <p className="lead text-center font-monospace">
              Never miss a deal 🚀 Get instant product price updates sent
              straight to your
              <span className="whatsapp-secondary fw-bold"> WhatsApp</span>!
            </p>
          </div>

          <div className="row">
            <div className="col-4 mx-auto">
              <img
                src="https://picsum.photos/600/300"
                alt="random"
                className="rounded shadow-lg img-fluid d-block"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="product">
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

        <div className="container">
          <div className="row my-5">
            <h2 className="display-6 text-muted text-center">OR</h2>
            <small className="text-muted text-center">
              Just send us the product link on WhatsApp (+92 335 2501007) and
              we'll start tracking it for you! ⚡
            </small>
          </div>
        </div>
      </section>

      <section id="guide" className="bg-primary text-white shadow-lg my-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-7 mx-auto my-4 p-2">
              <h2 className="display-5 text-center">
                Step by Step Process to Track Price
              </h2>
            </div>
            <div className="row ">
              <div className="col-sm-6 mx-auto mb-3">
                <div className="card">
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

            <div className="row ">
              <div className="col-sm-6 mx-auto mb-3">
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

            <div className="row ">
              <div className="col-sm-6 mx-auto mb-3">
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

            <div className="row ">
              <div className="col-sm-6 mx-auto mb-3">
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
          <div className="row">
            <h2 className="display-5 text-center">What is Walert?</h2>
          </div>
          <div className="row my-5">
            <div className="col-sm-7 col-md-5 whatsapp-secondary-bg text-white rounded shadow mx-auto p-5">
              <p className="lead">
                Walert.pk is your smart price-tracking companion!
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row my-5">
            <div className="col-sm-7 col-md-5 whatsapp-secondary-bg text-white rounded shadow mx-auto p-5">
              <p className="lead">
                That helps you shop wisely, save money, and stay within budget.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-5">
            <div className="col-sm-7 col-md-5 whatsapp-secondary-bg text-white rounded shadow mx-auto p-5">
              <p className="lead">
                With powerful features like price tracking and drop alerts,
                you'll always know the best time to buy your favorite products.
              </p>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row my-5">
            <div className="col-sm-7 col-md-5 whatsapp-secondary-bg text-white rounded shadow mx-auto p-5">
              <p className="lead">
                Get notified instantly, grab the best deals, and become a savvy
                shopper with Walert.pk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
