const ProductCard = ({product}) => {
    return (
        <Link to={`/products/${product.id}`} className="flex flex-col items-center cursor-pointer">
            <p className="text-2xl">{product.title}</p>
            <p>{product.price.toFixed(2)}zł</p>
        </Link>
    )
}

export default ProductCard;