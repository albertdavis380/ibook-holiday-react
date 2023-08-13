import React from "react";
import ReactDOM from "react-dom/client";

import { configureStore } from "@reduxjs/toolkit";
import App from "./components/App";
import { Provider } from "react-redux";
import appReducer from "./store";
import { productApi } from "./store/queries/products";

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      productApi.middleware,
    ),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
