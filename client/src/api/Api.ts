import api from "./ApiConfig";

export const getProductDetails = async (id: number) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    return;
  }
};
