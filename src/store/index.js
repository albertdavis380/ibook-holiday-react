import { combineReducers } from "@reduxjs/toolkit";


import productSlice from "./slices/product/productSlice";
import productSingleSlice from "./slices/product/productSingleSlice";

const appReducer = combineReducers({
  product: productSlice,
  productSingle: productSingleSlice,
});

export default appReducer;
