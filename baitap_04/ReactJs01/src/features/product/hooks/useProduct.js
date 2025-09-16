// src/features/product/hooks/useProduct.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";

const useProduct = () => {
    const dispatch = useDispatch();
    const { products, loading, totalPage, page } = useSelector((state) => state.product);

    // local state
    const [search, setSearch] = useState("");
    const [filterCriteria, setFilterCriteria] = useState("");
    const [priceFilter, setPriceFilter] = useState("");
    const [ratingFilter, setRatingFilter] = useState("");
    const [regionFilter, setRegionFilter] = useState("");
    const [currentPage, setPage] = useState(1);

    useEffect(() => {
        dispatch(
        fetchProducts({
            page: currentPage,
            limit: 8,
            search,
            filter: filterCriteria,
            category: regionFilter,
        })
        );
    }, [dispatch, currentPage, search, filterCriteria, priceFilter, ratingFilter, regionFilter]);

    return {
        search, setSearch,
        filterCriteria, setFilterCriteria,
        priceFilter, setPriceFilter,
        ratingFilter, setRatingFilter,
        regionFilter, setRegionFilter,
        products,
        loading,
        totalPage,
        currentPage,
        setPage,
    };
};

export default useProduct;