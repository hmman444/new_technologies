// src/features/product/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProductsApi, getProductDetailApi } from "../services/productService";

const initialState = {
    products: [],
    total: 0,
    totalPage: 1,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
    productDetail: null,
};

// Async thunk: lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async ({ page = 1, limit = 10, category = "", search = "", filter = "" }, thunkAPI) => {
        try {
        const res = await getProductsApi({ page, limit, category, search, filter });
        return res;
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error fetching products");
        }
    }
);

// Async thunk: lấy chi tiết sản phẩm
export const fetchProductDetail = createAsyncThunk(
    "product/fetchDetail",
    async (id, thunkAPI) => {
        try {
        const res = await getProductDetailApi(id);
        return res;
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error fetching product detail");
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
        state.totalPage = 1;
        state.error = null;
        },
        clearProductDetail: (state) => {
        state.productDetail = null;
        state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
        // danh sách
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            const { products, total, page, limit } = action.payload;
            state.products = products; // ✅ giữ đúng data trang hiện tại
            state.total = total;
            state.page = page;
            state.limit = limit;
            state.totalPage = Math.ceil(total / limit); // ✅ tính tổng số trang
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // chi tiết
        .addCase(fetchProductDetail.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetail.fulfilled, (state, action) => {
            state.loading = false;
            state.productDetail = action.payload;
        })
        .addCase(fetchProductDetail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { resetProducts, clearProductDetail } = productSlice.actions;
export default productSlice.reducer;