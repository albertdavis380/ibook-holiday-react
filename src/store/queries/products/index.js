import { createApi } from "@reduxjs/toolkit/query/react";
import { getAxiosInstance } from "../../../api";

const axiosBaseQuery =
  () =>
  async ({ params, endpoint, method, body, url }) => {
    const api = await getAxiosInstance();
    // Define your custom logic to build URL, query parameters, etc.

    try {
      const getParams = (key) => {
        if (params?.[key]) {
          return `${key}=${
            typeof params?.[key] === "object"
              ? params?.[key]["value"]
              : params?.[key]
          }`;
        } else {
          return "";
        }
      };
      const getQuery = (paramsData) => {
        return getParams(paramsData) !== "" ? `&${getParams(paramsData)}` : "";
      };

      var str = "";
      for (var key in params) {
        if (str != "") {
          str += "&";
        }
        if (params[key] != undefined) {
          str += key + "=" + encodeURIComponent(params[key]);
        }
      }

      let url = `${endpoint}?${str}`;

      // Build URL and send the request using the Axios instance
      const response = await api[method](url, body);

      // Process and return the response data
      return { data: response?.data };
    } catch (axiosError) {
      // Handle errors and return error data
      return {
        data: axiosError?.response?.data || axiosError.message,
      };
    }
  };

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProductData: builder.query({
      query: (values) => ({
        method: "get",
        params: values,
        endpoint: "/products", // Replace with your actual endpoint
      }),
      providesTags: ["Product"],
    }),
    // Add more endpoints for product management as needed
  }),
});

export const { useGetProductDataQuery } = productApi;
