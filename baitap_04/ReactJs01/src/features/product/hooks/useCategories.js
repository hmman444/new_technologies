// src/features/product/hooks/useCategories.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../slices/categorySlice";

const useCategories = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return { categories, loading, error };
};

export default useCategories;