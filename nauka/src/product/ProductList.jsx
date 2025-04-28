import { useLocation } from "react-router-dom";
import ProductDetails from "../routes/ProductDetails";

const ProductList = () => {
    const location = useLocation();
    const registered = location.state?.registered;
    return (
        <div>
            {registered && <span className="text-green-500">Zalogowany pomyślnie!</span>}
            <div>
                <ProductDetails/>
            </div>
        </div>
    )
}

export default ProductList;