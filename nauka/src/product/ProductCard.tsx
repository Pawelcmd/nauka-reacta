import { useCart } from "@/context/CartContext";
import Product from "@/types/product";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: Product }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();

    const isInCart = cartItems.some((item: Product) => item?.id === product?.id);

    const handleCartAction = () => {
        if (isInCart) {
            removeFromCart(product.id);
        } else {
            addToCart(product);
        }
    }

    return (
        <>
            <Link to={`/products/${product.id}`} className="flex flex-col items-center cursor-pointer">
                <p>{product.price.toFixed(2)}zł</p>
            </Link>
            <span>{product.category}</span>
            <button onClick={handleCartAction}>
                {isInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
            </button>
        </>
    )
}

export default ProductCard;