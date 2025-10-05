import { AxiosError } from "axios";
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

export const getWebsites = async () => {
  try {
    const response = await api.get("/websites");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomers = async () => {
  try {
    const response = await api.get("/customers");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addWebsite = async (
  website: string,
  priceSelector: string,
  nameSelector: string
) => {
  try {
    const response = await api.post("/add-supported-website", {
      url: website,
      priceSelector: priceSelector,
      productNameSelector: nameSelector,
    });

    if ("data" in response) {
      return response.data;
    }
  } catch (error) {
    return error instanceof AxiosError
      ? error.response?.data
      : { success: false };
  }
};

export const getAllProducts = async () => {
  try {
    const response = await api.get("/products");

    if ("data" in response) {
      return response.data;
    }
  } catch (error) {
    return error instanceof AxiosError && error.message;
  }
};

export const getAllTrackersReq = async () => {
  try {
    const response = await api.get("/more-trackers-req");

    if ("data" in response) {
      return response.data;
    }
  } catch (error) {
    return error instanceof AxiosError && error.message;
  }
};

export const getAllMessages = async (isGetSent: boolean) => {
  try {
    let response;

    // If `getSent` is true, the function retrieves sent messages instead of received ones.
    // Used in the admin panel to toggle between viewing sent and received messages.

    if (isGetSent) {
      response = await api.get("/messages-sent");
    } else {
      response = await api.get("/messages-recieved");
    }

    if ("data" in response) {
      return response.data;
    }
  } catch (error) {
    return error instanceof AxiosError && error.message;
  }
};

// Auth

export const adminExists = async (): Promise<boolean | null> => {
  try {
    const response = await api.get("/check-admin-exists");
    // enforces only one admin exists in database
    return response.data.adminExists;
  } catch (error) {
    console.log(error instanceof AxiosError && error.message);
    return null;
  }
};

export const register = async ({
  username,
  password,
  email,
}: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await api.post("/register", {
      username,
      password,
      email,
    });

    if ("data" in response) {
      localStorage.setItem("walert_token", response.data.token);
      return true;
    }

    return false;
  } catch (error) {
    console.log(error instanceof AxiosError && error.message);
    return false;
  }
};

export const apiLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });

    if (response.data.token) {
      localStorage.setItem("walert_token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.log(error instanceof AxiosError && error.message);
  }
};
