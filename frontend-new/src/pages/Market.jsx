import React, { useState } from 'react';
import { ShoppingBag, Tag, Phone, Plus, ArrowLeft, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Market.css';

const DUMMY_PRODUCTS = [
    { id: 1, name: "Organic Urea Fertilizer", category: "Fertilizer", price: "₹450/kg", seller: "Ramesh Kumar", type: "sell" },
    { id: 2, name: "Fresh Tomatoes (Hybrid)", category: "Vegetables", price: "₹40/kg", seller: "Suresh Farm", type: "sell" },
    { id: 3, name: "Pesticide Sprayer (5L)", category: "Equipment", price: "₹1200", seller: "Agri Tools Co.", type: "sell" },
    { id: 4, name: "Vermicompost Pack", category: "Fertilizer", price: "₹200/kg", seller: "Green Earth", type: "sell" },
];

export default function Market() {
    const [view, setView] = useState('home'); // home | buy | sell
    const [products, setProducts] = useState(DUMMY_PRODUCTS);
    const [categories, setCategory] = useState('All');

    // Sell Form State
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'Vegetables' });

    const handleSellSubmit = (e) => {
        e.preventDefault();
        const product = {
            id: Date.now(),
            ...newProduct,
            seller: "You (Local Farmer)",
            type: "sell"
        };
        setProducts([product, ...products]);
        setView('buy'); // Redirect to buy page to see listing
        setNewProduct({ name: '', price: '', category: 'Vegetables' });
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
                                {['All', 'Vegetables', 'Fertilizer', 'Equipment'].map(cat => (
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
                                        <div className="product-img-placeholder">
                                            {product.category === 'Vegetables' ? '🍅' :
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
