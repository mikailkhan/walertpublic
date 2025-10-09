import { useEffect, useState } from "react";
import { IoOpen } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../api/Api";

const Product = () => {
  const { productId } = useParams();

  const [website, setWebsite] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [URL, setURL] = useState("");
  const [productFound, setProductFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const product = await getProductDetails(Number(productId));

        if (product) {
          setWebsite(product.website);
          setProductTitle(product.productTitle);
          setOldPrice(product.oldPrice);
          setURL(product.url);
          setProductFound(true);
        }

        console.log(product);
      }
    };

    fetchData();
  }, [productId]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <div className="card">
            <div className="card-body text-center">
              {productFound ? (
                <>
                  <h5 className="card-title text-center">
                    {productTitle}
                    <small className="text-small"> ({website})</small>
                  </h5>

                  <p className="card-text">Old Price: {oldPrice} Rs</p>

                  <a href={URL} className="btn btn-danger text-white lead">
                    Current Price <IoOpen />
                  </a>
                </>
              ) : (
                <p className="lead">No Product ❌</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
