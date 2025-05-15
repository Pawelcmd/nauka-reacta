import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { FaShoppingCart, FaSun, FaMoon } from 'react-icons/fa';
import useProducts from '../hooks/useProducts';
import useDebounce from '../hooks/useDebounce';
import Product from '@/types/product';

type SortOption = '' | 'price_asc' | 'price_desc';
type CartItem = Product & { quantity: number };


const ProductsPage = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [showCart, setShowCart] = useState<boolean>(false);
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const storedMode = localStorage.getItem('darkMode');
        return storedMode ? JSON.parse(storedMode) : false;
    });
    const [sortState, setSortState] = useState<SortOption>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const token = localStorage.getItem('authToken');
    const { data, error, isLoading } = useProducts({
        minPrice,
        maxPrice,
        selectedCategory,
        searchQuery: debouncedSearchQuery,
        sortState,
    });

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/login');
    };

    const addToCart = useCallback((product: Product) => {
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
    }, []);

    const removeFromCart = useCallback((indexToRemove: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((_, index) => index !== indexToRemove);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    const toggleCart = useCallback(() => {
        setShowCart((prev) => !prev);
    }, []);

    const toggleDarkMode = useCallback(() => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', JSON.stringify(newMode));
            return newMode;
        });
    }, []);

    const totalPrice = useMemo(() => {
        return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    }, [cart]);

    const uniqueCategories = useMemo(() => {
        if (!data) return [];
        const products = data as Product[];
        const categories = products.map(product => product.category);
        return [''].concat([...new Set(categories)]);
    }, [data]);

    const clearCart = useCallback(() => {
        setCart([]);
        localStorage.setItem('cart', JSON.stringify([]));
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
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
        <div className="container" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <h1 className='mr-auto'>Lista produktów</h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className='mr-3.5' style={{ position: 'relative', cursor: 'pointer' }} onClick={toggleCart}>
                        <FaShoppingCart size={28} />
                        <span style={{
                            position: 'absolute',
                            top: -5,
                            right: -10,
                            background: 'red',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px 6px',
                            fontSize: '12px'
                        }}>
                            {cart.length}
                        </span>
                    </div>
                    <span className="text-sm font-semibold">
                        Suma: ${totalPrice}
                    </span>
                </div>

                <button onClick={toggleDarkMode} style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}>
                    {darkMode ? <FaSun size={20} color="yellow" /> : <FaMoon size={20} />}
                </button>
            </div>

            <div className="my-4">
                <label htmlFor="sort" className="mr-2">Sortuj:</label>
                <select
                    value={sortState}
                    onChange={(e) => setSortState(e.target.value as 'price_asc' | 'price_desc' | '')}
                >
                    <option value="">Brak sortowania</option>
                    <option value="price_asc">Cena rosnąco</option>
                    <option value="price_desc">Cena malejąco</option>
                </select>

                <div className="my-4 flex gap-4 items-center">
                    <label>Filtruj cenę:</label>
                    <input
                        type="number"
                        placeholder="Cena minimalna"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border px-2 py-1 rounded text-black"
                    />
                    <input
                        type="number"
                        placeholder="Cena maksymalna"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border px-2 py-1 rounded text-black"
                    />
                </div>

                <div className="my-4">
                    <label htmlFor="category" className="mr-2">Kategoria:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border px-2 py-1 rounded text-black"
                    >
                        <option value="">Wszystkie</option>
                        {uniqueCategories
                            .filter(c => c !== '')
                            .map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="my-4">
                    <label htmlFor="search">Wyszukaj:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Wyszukaj po nazwie lub opisie"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border px-2 py-1 rounded text-black"
                    />
                </div>
            </div>

            {showCart && (
                <div style={{
                    position: 'absolute',
                    top: 100,
                    right: 0,
                    background: '#fff',
                    border: '1px solid #ccc',
                    padding: '10px',
                    width: '300px',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    color: '#000'
                }}>
                    <h3>Koszyk:</h3>
                    {cart.length === 0 ? (
                        <p>Koszyk jest pusty</p>
                    ) : (
                        <>
                            <button
                                onClick={clearCart}
                                className="btn btn-danger"
                                style={{ marginBottom: '10px' }}
                            >
                                Wyczyść koszyk
                            </button>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        </>
                    )}
                </div>
            )}

            {token && (
                <button onClick={handleLogout} className="btn btn-secondary mt-6 mb-6">
                    Wyloguj się
                </button>
            )}

            <div className="products-grid">
                {data.map((product: { id: any; title?: any; description?: any; price?: any; image?: any; }) => (
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