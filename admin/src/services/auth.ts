import api from "./apiConfig";

export const isLoggedIn = async () => {
  const token = localStorage.getItem("walert_token");

  if (!token) return false; // no token at all

  try {
    const res = await api.get("/auth/validate");
    console.log(res);
    if (res.data.loggedIn) {
      return true;
    }
    return false;
  } catch (err) {
    return false; // 401 or network error = not logged in
  }
};
