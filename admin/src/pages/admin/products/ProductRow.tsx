type ProductsType = {
  products: {
    createdBy: string | null;
    number: string;
    lastScrape: Date | null;
    productId: number;
    productName: string;
    link: string;
    currentPrice: number | null;
    originalPrice: number;
    userId: number | null;
    websiteId: number | null;
    createdAt: Date;
    website: string;
  }[];
};

const ProductRow = ({ products }: ProductsType) => {
  return (
    <>
      {products.map((val, index) => {
        return (
          <tr key={val.productId}>
            <th scope="row">{index + 1}</th>
            <td>{new Date(val.createdAt).toDateString()}</td>
            <td>{val.createdBy}</td>
            <td>{val.number}</td>
            <td>
              {val.lastScrape
                ? new Date(val.lastScrape).toLocaleString()
                : "N/A"}
            </td>
            <td>{val.website}</td>
            <td>{val.productName}</td>
            <td>{val.originalPrice}</td>
            <td>{val.currentPrice}</td>
            <td>{val.link}</td>
          </tr>
        );
      })}
    </>
  );
};

export default ProductRow;
