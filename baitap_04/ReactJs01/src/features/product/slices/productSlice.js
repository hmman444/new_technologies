import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getProductsApi,
    getProductDetailApi,
    toggleWishlistApi,
    getWishlistApi,
} from "../services/productService";

const initialState = {
    products: [],
    total: 0,
    totalPage: 1,
    page: 1,
    limit: 10,
    loading: false,
    error: null,
    productDetail: null,
    wishlistIds: [],
};

export const fetchProducts = createAsyncThunk(
    "product/fetchProducts",
    async ({ page = 1, limit = 10, category = "", search = "", filter = "" }, thunkAPI) => {
        try {
        return await getProductsApi({ page, limit, category, search, filter });
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error fetching products");
        }
    }
);

export const fetchProductDetail = createAsyncThunk(
    "product/fetchDetail",
    async (id, thunkAPI) => {
        try {
        return await getProductDetailApi(id);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error fetching product detail");
        }
    }
);

export const toggleWishlist = createAsyncThunk(
    "product/toggleWishlist",
    async (productId, thunkAPI) => {
        try {
        // backend đã trả { liked, message, productId } (nhớ đã sửa controller)
        return await toggleWishlistApi(productId);
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error toggle wishlist");
        }
    }
);

export const fetchWishlist = createAsyncThunk(
    "product/fetchWishlist",
    async (_, thunkAPI) => {
        try {
        // backend trả mảng: [{ userId, productId: {...} }, ...]
        return await getWishlistApi();
        } catch (err) {
        return thunkAPI.rejectWithValue(err.message || "Error fetching wishlist");
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
        // list
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            const { products, total, page, limit } = action.payload;
            state.products = products;
            state.total = total;
            state.page = page;
            state.limit = limit;
            state.totalPage = Math.ceil(total / limit);
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // detail
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
        })

        // wishlist
        .addCase(fetchWishlist.fulfilled, (state, action) => {
            // map về array ID, dù backend populate hay không
            state.wishlistIds = (action.payload || []).map(
            (w) => w.productId?._id ?? w.productId
            );
        })
        .addCase(toggleWishlist.fulfilled, (state, action) => {
            const { liked, productId } = action.payload || {};
            if (!productId) return;

            if (liked) {
            if (!state.wishlistIds.includes(productId)) {
                state.wishlistIds.push(productId);
            }
            } else {
            state.wishlistIds = state.wishlistIds.filter((id) => id !== productId);
            }
        });
    },
});

export const { resetProducts, clearProductDetail } = productSlice.actions;
export default productSlice.reducer;