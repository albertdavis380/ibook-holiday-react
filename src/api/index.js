import axios from "axios";

const BASE_URL = process.env.REACT_APP_APIURL;

let token = "";

export const getAxiosInstance = async () => {
  try {
    token = localStorage.getItem("USER_ACCESS_TOKEN");
  } catch (e) {
  } finally {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Accept: "application/json",

        Authorization: `Bearer ${token}`,
      },
    });
    instance.interceptors.request.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return instance;
  }
};
