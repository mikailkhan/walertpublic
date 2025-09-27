import api from "./apiConfig";

export const getDashboard = async () => {
  try {
    const response = await api.get("/dashboard");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getErrors = async () => {
  try {
    const response = await api.get("/errors");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
