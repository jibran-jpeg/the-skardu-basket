import React, { useEffect } from 'react';
import { X, ChevronRight, Home, ShoppingBag, MapPin, Search, Leaf, Mountain } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { storeConfig } from '../store.config';

export function MobileMenu({ isOpen, onClose }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    const { products, categories } = useProducts();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            onClose();
            setSearchQuery('');
        }
    };

    const handleLinkClick = (path) => {
        onClose();
        if (path.includes('#')) {
            const id = path.split('#')[1];
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 300);
        }
    };

    // Close menu when route changes
    useEffect(() => {
        onClose();
    }, [location.pathname, location.search]);

    const menuItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/products', label: 'All Products', icon: ShoppingBag },
        { path: '/about', label: 'About Us', icon: Mountain }, // Reusing Mountain icon or import specific one if needed
        { path: '/#harvesting-now', label: 'Harvesting Now', icon: Leaf },
        { path: '/our-orchards', label: 'Our Orchards', icon: Mountain },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[90] transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div className={`fixed inset-y-0 left-0 w-[85%] max-w-[320px] bg-white dark:bg-[#0B0C10] shadow-2xl z-[90] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1D23] dark:to-[#0B0C10]">

                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-white/10">
                        <Link to="/" className="text-2xl font-serif font-black tracking-tighter text-brand-primary dark:text-[#F5F5F5]">
                            SKARDU<span className="text-brand-accent text-xl font-script font-light ml-1">Organics</span>
                        </Link>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                        {/* Search Bar */}
                        <div className="mb-8 relative z-50">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:ring-2 focus:ring-brand-primary dark:focus:ring-brand-accent transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
                                />
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                                {/* Search Suggestions Dropdown */}
                                {searchQuery && (
                                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#1A1D23] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-[100] animate-fade-in-up">
                                        {products
                                            .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .slice(0, 5) // Limit to 5 results
                                            .map(product => (
                                                <Link
                                                    key={product.id}
                                                    to={`/product/${product.id}`}
                                                    onClick={() => {
                                                        onClose();
                                                        setSearchQuery('');
                                                    }}
                                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b last:border-none border-gray-100 dark:border-white/5"
                                                >
                                                    <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{product.name}</h4>
                                                        <p className="text-xs text-brand-primary dark:text-brand-accent font-medium">{storeConfig.currency}{product.price}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                            <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                                No products found.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </form>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Menu</p>
                            <div className="space-y-1">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={item.label}
                                        to={item.path}
                                        onClick={() => handleLinkClick(item.path)}
                                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all active:scale-95"
                                        style={{ animation: `fade-in-left 0.5s ease-out ${index * 0.1}s backwards` }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand-primary/5 dark:bg-brand-accent/10 flex items-center justify-center text-brand-primary dark:text-brand-accent group-hover:bg-brand-primary group-hover:text-white dark:group-hover:bg-brand-accent dark:group-hover:text-black transition-colors">
                                                <item.icon size={18} />
                                            </div>
                                            <span className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">
                                                {item.label}
                                            </span>
                                        </div>
                                        <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 px-2">Categories</p>
                            <div className="grid grid-cols-2 gap-3">
                                {categories.map((cat, i) => (
                                    <Link
                                        key={cat.name}
                                        to={`/products?category=${cat.id}`}
                                        onClick={onClose}
                                        className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl text-center hover:bg-brand-primary hover:text-white dark:hover:bg-brand-accent dark:hover:text-black transition-all shadow-sm text-brand-primary dark:text-gray-200"
                                        style={{ animation: `fade-in-up 0.5s ease-out ${0.2 + (i * 0.1)}s backwards` }}
                                    >
                                        <span className="text-sm font-bold font-serif">{cat.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm">
                        <Link
                            to="/products"
                            className="flex items-center justify-center w-full bg-brand-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg hover:bg-brand-primary/90 transition-transform active:scale-95"
                        >
                            Shop All Products
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
