// import { useLocation } from "react-router-dom";
// import ProductDetails from "../routes/ProductDetails";
// import { useMemo, useState } from "react";
// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then(res => res.json());

// const ProductList = () => {
//     const [sortState, setsortState] = useState("none");
//     const [selectedProductId, setSelectedProductId] = useState(null);
//     const location = useLocation();
//     const registered = location.state?.registered;

//     const { data, error, isLoading } = useSWR("https://fakestoreapi.com/products", fetcher);

//     if (isLoading) return <div>Ładowanie...</div>;
//     if (error) return <div>Wystąpił błąd przy ładowaniu produktów.</div>;

//     const sortedProducts = useMemo(() => {
//         if (!data) return [];
//         const listCopy = [...data];
//         switch (sortState) {
//             case "price_asc":
//                 return listCopy.sort((a, b) => a.price - b.price);
//             case "price_desc":
//                 return listCopy.sort((a, b) => b.price - a.price);
//             default:
//                 return listCopy;
//         }
//     }, [data, sortState]);

//     return (
//         <div className="p-4">
//             {registered && <span className="text-green-500">Zalogowany pomyślnie!</span>}

//             <div className="mb-4">
//                 <select
//                     value={sortState}
//                     onChange={(e) => setsortState(e.target.value)}
//                     className="border px-2 py-1 rounded"
//                 >
//                     <option value="none">Brak sortu</option>
//                     <option value="price_asc">Cena rosnąco</option>
//                     <option value="price_desc">Cena malejąco</option>
//                 </select>
//             </div>

//             <ul className="space-y-2">
//                 {sortedProducts.map((product) => (
//                     <li
//                         key={product.id}
//                         className="border p-2 rounded cursor-pointer hover:bg-gray-100"
//                         onClick={() => setSelectedProductId(product.id)}
//                     >
//                         <div><strong>{product.title}</strong></div>
//                         <div>Cena: ${product.price}</div>
//                     </li>
//                 ))}
//             </ul>

//             {/* Szczegóły wybranego produktu */}
//             {selectedProductId && (
//                 <div className="mt-6 border-t pt-4">
//                     <ProductDetails id={selectedProductId} />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductList;