import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../reactjs01/src/features/product/slices/productSlice";

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export default store;
