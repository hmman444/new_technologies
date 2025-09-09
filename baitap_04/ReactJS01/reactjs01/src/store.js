import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../../reactjs01/src/features/product/slices/productSlice";
import categoryReducer from "../../reactjs01/src/features/product/slices/categorySlice";

const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
    },
});

export default store;
