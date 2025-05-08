import useSWR from "swr"
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useProductDetails = ({id}) => {
    const {data, error, isLoading} = useSWR(
        `https://fakestoreapi.com/products/${id}`, 
        fetcher
    );

    return {
        data,
        error,
        isLoading,
    };
};

export default useProductDetails;