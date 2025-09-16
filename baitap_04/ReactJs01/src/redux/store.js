import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/slices/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});

export default store;