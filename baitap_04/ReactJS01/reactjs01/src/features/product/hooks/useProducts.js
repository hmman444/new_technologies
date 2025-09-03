import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, resetProducts } from "../slices/productSlice";

const useProducts = ({ search = "", limit = 8 } = {}) => {
    const dispatch = useDispatch();
    const { products, loading, page, hasMore } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(resetProducts());
        dispatch(fetchProducts({ page: 1, limit, search }));
    }, [search, limit, dispatch]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            dispatch(fetchProducts({ page: page + 1, limit, search }));
        }
    }, [loading, hasMore, page, limit, search, dispatch]);

    return { products, loading, hasMore, loadMore };
};

export default useProducts;