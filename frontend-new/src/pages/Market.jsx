import React, { useState, useEffect } from 'react';
import { ShoppingBag, Tag, Phone, Plus, ArrowLeft, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Market.css';

const DUMMY_PRODUCTS = [
    // Fertilizers
    { id: 1, name: "Organic Urea Fertilizer", category: "Fertilizer", price: "₹450/kg", seller: "Ramesh Kumar", type: "sell", image: "/products/organic_fertilizer_1765751087685.png" },
    { id: 2, name: "Vermicompost Pack", category: "Fertilizer", price: "₹200/kg", seller: "Green Earth", type: "sell", image: "/products/vermicompost_pack_1765751103160.png" },
    { id: 3, name: "Cow Dung Manure (Fresh)", category: "Fertilizer", price: "₹50/kg", seller: "Mohan Dairy Farm", type: "sell", image: "/products/cow_dung_manure_1765751118633.png" },
    { id: 4, name: "NPK Complex Fertilizer", category: "Fertilizer", price: "₹850/kg", seller: "Agri Supplies", type: "sell" },
    { id: 5, name: "Neem Cake Organic", category: "Fertilizer", price: "₹300/kg", seller: "Organic Farmers Co-op", type: "sell" },

    // Equipment & Machines
    { id: 6, name: "Pesticide Sprayer (5L)", category: "Equipment", price: "₹1200", seller: "Agri Tools Co.", type: "sell", image: "/products/pesticide_sprayer_1765751132561.png" },
    { id: 7, name: "Mini Tiller Machine", category: "Equipment", price: "₹15,000", seller: "Farm Machinery Ltd", type: "sell", image: "/products/mini_tiller_1765751149103.png" },
    { id: 8, name: "Drip Irrigation Kit", category: "Equipment", price: "₹3,500", seller: "Water Solutions", type: "sell", image: "/products/drip_irrigation_1765751163457.png" },
    { id: 9, name: "Solar Water Pump", category: "Equipment", price: "₹25,000", seller: "Green Energy Systems", type: "sell", image: "/products/solar_pump_1765751250453.png" },
    { id: 10, name: "Chaff Cutter Machine", category: "Equipment", price: "₹8,500", seller: "Agro Machines", type: "sell" },

    // Vegetables
    { id: 11, name: "Fresh Tomatoes (Hybrid)", category: "Vegetables", price: "₹40/kg", seller: "Suresh Farm", type: "sell", image: "/products/fresh_tomatoes_1765751186958.png" },
    { id: 12, name: "Organic Potatoes", category: "Vegetables", price: "₹30/kg", seller: "Krishna Farms", type: "sell", image: "/products/organic_potatoes_1765751200867.png" },
    { id: 13, name: "Fresh Onions (Red)", category: "Vegetables", price: "₹35/kg", seller: "Ravi Agriculture", type: "sell" },
    { id: 14, name: "Green Chillies", category: "Vegetables", price: "₹60/kg", seller: "Spice Farmers", type: "sell" },
    { id: 15, name: "Cabbage (Fresh)", category: "Vegetables", price: "₹25/kg", seller: "Vegetable Market", type: "sell" },

    // Seeds
    { id: 16, name: "Hybrid Tomato Seeds", category: "Seeds", price: "₹500/pack", seller: "Seed Bank India", type: "sell", image: "/products/tomato_seeds_1765751216105.png" },
    { id: 17, name: "Wheat Seeds (HI-1544)", category: "Seeds", price: "₹800/kg", seller: "Government Seed Store", type: "sell" },
    { id: 18, name: "Sunflower Seeds", category: "Seeds", price: "₹400/kg", seller: "Oil Seeds Co.", type: "sell" },

    // Fruits
    { id: 19, name: "Fresh Mangoes (Alphonso)", category: "Fruits", price: "₹150/kg", seller: "Mango Orchard", type: "sell", image: "/products/fresh_mangoes_1765751232803.png" },
    { id: 20, name: "Bananas (Robusta)", category: "Fruits", price: "₹40/dozen", seller: "Banana Plantation", type: "sell" },

    // Other
    { id: 21, name: "Jute Bags (50kg capacity)", category: "Equipment", price: "₹25/piece", seller: "Packaging Supplies", type: "sell" },
    { id: 22, name: "Organic Pesticide (Neem Oil)", category: "Fertilizer", price: "₹350/liter", seller: "Bio Pesticides", type: "sell" },
];

export default function Market() {
    const [view, setView] = useState('home'); // home | buy | sell
    const [products, setProducts] = useState([]);
    const [categories, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    // Sell Form State
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Vegetables' });

    // Fetch products from backend on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { marketAPI } = await import('../utils/api');
                const response = await marketAPI.getProducts();

                if (response.success && response.data?.products) {
                    setProducts(response.data.products);
                } else {
                    // Fallback to dummy data
                    setProducts(DUMMY_PRODUCTS);
                }
            } catch (error) {
                console.error('Failed to fetch products:', error);
                setProducts(DUMMY_PRODUCTS);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSellSubmit = async (e) => {
        e.preventDefault();
        const product = {
            ...newProduct,
            seller: "You (Local Farmer)",
            type: "sell"
        };

        // Optimistically update UI
        const tempProduct = { ...product, id: Date.now() };
        setProducts([tempProduct, ...products]);
        setView('buy'); // Redirect to buy page to see listing
        setNewProduct({ name: '', price: '', category: 'Vegetables' });

        // Sync to backend
        try {
            const { marketAPI } = await import('../utils/api');
            const response = await marketAPI.createProduct(product);

            if (response.success && response.data?.product) {
                // Update with server-generated product
                setProducts(prev => [
                    response.data.product,
                    ...prev.filter(p => p.id !== tempProduct.id)
                ]);
            }
        } catch (error) {
            console.error('Failed to create product:', error);
            // Keep the optimistic update even if backend fails
        }
    };

    const handleCall = (sellerName) => {
        alert(`Calling ${sellerName}... \n(Simulation: Dialing 9876543210)`);
    };

    return (
        <div className="market-container container">
            {/* Navigation / Header */}
            <div className="market-header">
                {view !== 'home' && (
                    <button onClick={() => setView('home')} className="btn btn-glass back-btn">
                        <ArrowLeft size={18} /> Back
                    </button>
                )}
                <h1 className="gradient-text">Krishi Market</h1>
            </div>

            <AnimatePresence mode="wait">
                {/* HOME VIEW */}
                {view === 'home' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="market-home"
                        key="home"
                    >
                        <div className="market-choice-card" onClick={() => setView('buy')}>
                            <div className="icon-wrapper buy-icon"><ShoppingBag size={48} /></div>
                            <h2>Buy Products</h2>
                            <p>Vegetables, Fertilizers, Tools</p>
                        </div>
                        <div className="market-choice-card" onClick={() => setView('sell')}>
                            <div className="icon-wrapper sell-icon"><Tag size={48} /></div>
                            <h2>Sell Produce</h2>
                            <p>List your harvest for free</p>
                        </div>
                    </motion.div>
                )}

                {/* SELL VIEW */}
                {view === 'sell' && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="sell-form-wrapper glass"
                        key="sell"
                    >
                        <h2>List Your Product</h2>
                        <form onSubmit={handleSellSubmit}>
                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    placeholder="E.g. Fresh Potatoes"
                                    required
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price (₹/kg or Unit)</label>
                                <input
                                    type="text"
                                    placeholder="E.g. ₹50/kg"
                                    required
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={newProduct.category}
                                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option>Vegetables</option>
                                    <option>Fruits</option>
                                    <option>Fertilizer</option>
                                    <option>Equipment</option>
                                    <option>Seeds</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary full-width">
                                <Plus size={18} /> Post Ad
                            </button>
                        </form>
                    </motion.div>
                )}

                {/* BUY VIEW */}
                {view === 'buy' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="buy-layout"
                        key="buy"
                    >
                        <div className="filters glass">
                            <div className="search-bar">
                                <Search size={18} className="search-icon" />
                                <input type="text" placeholder="Search vegetables, tools..." />
                            </div>
                            <div className="categories">
                                {['All', 'Vegetables', 'Fruits', 'Fertilizer', 'Equipment', 'Seeds'].map(cat => (
                                    <button
                                        key={cat}
                                        className={`cat-btn ${categories === cat ? 'active' : ''}`}
                                        onClick={() => setCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product-grid">
                            {products
                                .filter(p => categories === 'All' || p.category === categories)
                                .map(product => (
                                    <div key={product.id} className="product-card glass">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="product-img"
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'cover',
                                                    borderRadius: '12px 12px 0 0'
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className="product-img-placeholder"
                                            style={{ display: product.image ? 'none' : 'flex' }}
                                        >
                                            {product.category === 'Vegetables' ? '🍅' :
                                                product.category === 'Fruits' ? '🥭' :
                                                    product.category === 'Seeds' ? '🌾' :
                                                        product.category === 'Fertilizer' ? '🌱' : '⚙️'}
                                        </div>
                                        <div className="product-info">
                                            <span className="badge-category">{product.category}</span>
                                            <h3>{product.name}</h3>
                                            <div className="price-tag">{product.price}</div>
                                            <p className="seller-name">Seller: {product.seller}</p>
                                            <button
                                                className="btn btn-primary full-width call-btn"
                                                onClick={() => handleCall(product.seller)}
                                            >
                                                <Phone size={16} /> Call Seller
                                            </button>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
