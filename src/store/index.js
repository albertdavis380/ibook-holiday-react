import { combineReducers } from "@reduxjs/toolkit";

import { productApi } from "./queries/products";
import productSlice from "./slices/product/productSlice";
import productSingleSlice from "./slices/product/productSingleSlice";

const appReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  product: productSlice,
  productSingle: productSingleSlice,
});

export default appReducer;
