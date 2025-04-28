import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Link } from "react-router-dom";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductsPage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('authToken');

    const { data, error, isLoading } = useSWR('https://fakestoreapi.com/products', fetcher);

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        navigate('/login');
    };

    if (isLoading) return <span>Trwa pobieranie produktów...</span>;
    if (error) return <span>Błąd przy ładowaniu produktów</span>;

    return (
        <div>
            <h1>Lista produktów</h1>
            {token && (
                <button onClick={handleLogout} className="btn btn-secondary">
                    Wyloguj się
                </button>
            )}

            {data?.map((product) => (
                <div key={product.id} className="product-card">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p>Cena: ${product.price}</p>
                    <img src={product.image} alt={product.title} width="100" />
                    <Link to={`/products/${product.id}`}>Zobacz szczegóły</Link>
                </div>
            ))}
        </div>
    );
};

export default ProductsPage;