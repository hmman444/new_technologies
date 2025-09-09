import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, resetProducts } from "../slices/productSlice";

const useProducts = ({ search = "", limit = 8, filter = "", category = "" } = {}) => {
    const dispatch = useDispatch();
    const { products, loading, page, hasMore } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(resetProducts());
        dispatch(fetchProducts({ page: 1, limit, search, filter, category }));
    }, [search, limit, filter, category, dispatch]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchProducts({ page: page + 1, limit, search, filter, category }));
        }
    }, [loading, hasMore, page, limit, search, filter, category, dispatch]);

    return { products, loading, hasMore, loadMore };
};

export default useProducts;