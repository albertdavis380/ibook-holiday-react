import { getAxiosInstance } from "../../api";

export const login = async (params) => {
  const api = await getAxiosInstance();
  try {

    console.log("params",params)
    const response = await api.post("/login", params);

    return response;
  } catch (error) {
    return error.response.data;
  }
};


