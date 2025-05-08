import { useMemo } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useProducts = ({ minPrice, maxPrice, selectedCategory, searchQuery, sortState }) => {
    const { data, error, isLoading } = useSWR("https://fakestoreapi.com/products", fetcher);

    const filteredProducts = useMemo(() => {
        if (!data) return [];

        let filtered = [...data];

        if (minPrice !== '') {
            filtered = filtered.filter(product => product.price >= parseFloat(minPrice));
        }
        if (maxPrice !== '') {
            filtered = filtered.filter(product => product.price <= parseFloat(maxPrice));
        }

        if (selectedCategory !== '') {
            filtered = filtered.filter(product => product.category === selectedCategory);
        }

        if (searchQuery) {
            filtered = filtered.filter((product) => {
                const nameMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
                const descriptionMatch = product.description.toLowerCase().includes(searchQuery.toLowerCase());
                return nameMatch || descriptionMatch;
            });
        }

        switch (sortState) {
            case "price_asc":
                return filtered.sort((a, b) => a.price - b.price);
            case "price_desc":
                return filtered.sort((a, b) => b.price - a.price);
            default:
                return filtered;
        }
    }, [data, sortState, minPrice, maxPrice, selectedCategory, searchQuery]); 

    return {
        data: filteredProducts,
        error,
        isLoading,
    };
};

export default useProducts;