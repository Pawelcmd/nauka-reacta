import useSWR from "swr";
import Product from "@/types/product";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());


const useProductDetails = (productId: number) => {
  const { data, error, isLoading } = useSWR<Product>(
    `https://fakestoreapi.com/products/${productId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useProductDetails;