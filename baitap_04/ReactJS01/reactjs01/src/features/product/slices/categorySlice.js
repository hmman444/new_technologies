// src/features/product/slices/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi } from "../services/productService";

const initialState = {
    categories: [],
    loading: false,
    error: null
};

export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, thunkAPI) => {
        try {
            const res = await getCategoriesApi();
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Error fetching categories");
        }
    }
);

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default categorySlice.reducer;