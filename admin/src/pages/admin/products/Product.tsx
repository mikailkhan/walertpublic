import Breadcrumb from "../../components/Breadcrumb";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/api";
import ProductRow from "./ProductRow";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      console.log(response);
      setProducts(response);
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
            <th scope="col">Created At</th>
            <th scope="col">Created By</th>
            <th scope="col">Number</th>
            <th scope="col">Last Scraped</th>
            <th scope="col">Website</th>
            <th scope="col">Product</th>
            <th scope="col">Original Price</th>
            <th scope="col">Current Price</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          <ProductRow products={products} />
        </tbody>
      </table>
    </>
  );
};

export default Product;
