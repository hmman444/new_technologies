import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsApi } from "../services/productService";

const initialState = {
    products: [],
    total: 0,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
    hasMore: true
};

// Async thunk lấy sản phẩm
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async ({ page = 1, limit = 10, category = "", search = "" }, thunkAPI) => {
        try {
            const res = await getProductsApi({ page, limit, category, search });
            return res; // { products, total, page, limit }
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Error fetching products");
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.page = 1;
            state.hasMore = true;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                const { products, total, page, limit } = action.payload;
                state.products = page === 1 ? products : [...state.products, ...products];
                state.total = total;
                state.page = page;
                state.limit = limit;
                state.hasMore = state.products.length < total;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;