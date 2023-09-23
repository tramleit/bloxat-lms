export const formatPrice = (price, currency) => {
  if (!price || isNaN(price)) {
    return "0"; // Handle cases where price is not available or not a number
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "EGP", // Default to USD if currency is not provided
  }).format(price);
};
