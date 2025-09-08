export const domainExtract = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    return domain;
  } catch (error) {
    console.log(`Error in converting url to domain.`);
  }
};

export const dataQualityCheck = ({
  price,
  name,
}: {
  price: string;
  name: string;
}) => {
  let result = {
    success: true,
    errorMessage: "",
  };

  if (!price || price.trim().length === 0) {
    result.success = false;
    result.errorMessage = `Price is not fetched.`;
  } else if (!name || name.trim().length === 0) {
    result.success = false;
    result.errorMessage = `Product name is not fetched.`;
  }

  return result;
};

/**
 *
 * When price is fetched the raw price looks something like this, 1000rs or PKR 1000
 * This method turns the raw price to a number for example 1000
 *
 * @param price string
 * @returns price number
 */
export const cleanPrice = (price: string): number => {
  const match = price.match(/\d+(?:\.\d+)?/g); //  Rs.14,990.00 : string -> 14,900.00 : object

  if (!match) throw new Error("Error in conversion of price");

  let priceString = match.toString(); // converts to string
  priceString = priceString.replace(/,/g, ""); // 14,900.00 -> 14900.00

  const floatPrice = parseFloat(priceString); // 14900.00 : string -> float

  return Math.trunc(floatPrice); // 14900.00 : float -> 14900 : number
};
