import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ProductsPage = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [showCart, setShowCart] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const storedMode = localStorage.getItem('darkMode');
        return storedMode ? JSON.parse(storedMode) : false;
    });

    const token = localStorage.getItem('authToken');
    const { data, error, isLoading } = useSWR('https://fakestoreapi.com/products', fetcher);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.setItem("cart", JSON.stringify(cart));
        navigate('/login');
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const productExists = prevCart.find(item => item.id === product.id);
            if (productExists) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (indexToRemove) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((_, index) => index !== indexToRemove);
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const toggleCart = () => {
        setShowCart((prev) => !prev);
    };

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);

    if (isLoading) return <span>Trwa pobieranie produktów...</span>;
    if (error) return <span>Błąd przy ładowaniu produktów</span>;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 className='mr-auto'>Lista produktów</h1>

                <div className='mr-3.5'
                    style={{ position: 'relative', cursor: 'pointer' }}
                    onClick={toggleCart}
                >
                    <FaShoppingCart size={28} />
                    <span
                        style={{
                            position: 'absolute',
                            top: -5,
                            right: -10,
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '12px'
                        }}
                    >
                        {cart.length}
                    </span>
                </div>

                <button onClick={toggleDarkMode} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                    {darkMode ? <FaSun size={20} color="yellow" /> : <FaMoon size={20} />}
                </button>
            </div>

            {showCart && (
                <div
                    style={{
                        position: 'absolute',
                        top: 100,
                        right: 20,
                        background: '#fff',
                        border: '1px solid #ccc',
                        padding: '10px',
                        width: '300px',
                        zIndex: 10,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                >
                    <h3 className='text-black'>Koszyk:</h3>
                    {cart.length === 0 ? (
                        <p className='text-black'>Koszyk jest pusty</p>
                    ) : (
                        <div className='text-black' style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {cart.map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '10px',
                                        borderBottom: '1px solid #eee',
                                        paddingBottom: '5px'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <img src={item.image} alt={item.title} width="40" height="40" />
                                        <span style={{ fontSize: '14px' }}>
                                            {item.title} {item.quantity > 1 && `x${item.quantity}`}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        style={{
                                            background: 'transparent',
                                            border: 'none',
                                            color: 'red',
                                            fontSize: '18px',
                                            cursor: 'pointer'
                                        }}
                                        title="Usuń z koszyka"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {token && (
                <button onClick={handleLogout} className="btn btn-secondary mt-6 mb-6">
                    Wyloguj się
                </button>
            )}

            <div className="products-grid">
                {data?.map((product) => (
                    <div key={product.id} className="product-card">
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                        <p>Cena: ${product.price}</p>
                        <img src={product.image} alt={product.title} width="100" />
                        <div className="space-x-2">
                            <Link to={`/products/${product.id}`} className="btn btn-link">Zobacz szczegóły</Link>
                            <button onClick={() => addToCart(product)} className="btn btn-primary">
                                Dodaj do koszyka
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;