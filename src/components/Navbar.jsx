import React, { useState, useEffect } from 'react';
import { Menu, Search, User, ShoppingBag, Sun, Moon, X, Heart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import { storeConfig } from '../store.config';

export function Navbar({ onMenuClick, onCartClick }) {
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { isDarkMode, toggleTheme } = useTheme();
    const { user } = useAuth();
    const { wishlist } = useWishlist();
    const { products } = useProducts();

    const searchInputRef = React.useRef(null);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
        }
    };

    const location = useLocation();

    // Pages where the navbar should be transparent at the top (overlay)
    const isOverlayPage = ['/', '/our-orchards', '/about'].includes(location.pathname);

    // If we're not on an overlay page, always show the scrolled style (glass/solid)
    // If we ARE on an overlay page, only show scrolled style when actually scrolled
    const showScrolledStyle = !isOverlayPage || scrolled;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 z-[80] w-full transition-all duration-500 ease-in-out ${showScrolledStyle ? 'bg-white/70 dark:bg-[#0B0C10]/70 backdrop-blur-xl shadow-md' : 'bg-transparent'} `}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={onMenuClick}
                            className={`p-2 rounded-full transition-colors ${showScrolledStyle ? 'text-brand-primary dark:text-brand-accent hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center md:justify-start">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`text-3xl font-serif font-black tracking-tighter transition-colors ${showScrolledStyle ? 'text-brand-primary dark:text-brand-accent' : 'text-white'}`}
                        >
                            The Skardu<span className={`text-2xl font-script font-light tracking-wide ml-2 transition-colors ${showScrolledStyle ? 'text-brand-accent dark:text-white' : 'text-white/90'}`}>Basket</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className={`hidden md:flex items-center space-x-10 text-sm font-bold tracking-widest uppercase transition-colors ${showScrolledStyle ? 'text-brand-primary dark:text-gray-300' : 'text-white'}`}>
                        <Link to="/products" className={`transition-colors relative group ${showScrolledStyle ? 'hover:text-brand-accent dark:hover:text-white' : 'hover:text-white/80'}`}>
                            Shop
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
                        </Link>

                        <Link to="/about" className={`transition-colors relative group ${showScrolledStyle ? 'hover:text-brand-accent dark:hover:text-white' : 'hover:text-white/80'}`}>
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
                        </Link>

                        <Link to="/our-orchards" className={`transition-colors relative group ${showScrolledStyle ? 'hover:text-brand-accent dark:hover:text-white' : 'hover:text-white/80'}`}>
                            Orchards
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all group-hover:w-full"></span>
                        </Link>

                        <button
                            onClick={() => {
                                if (location.pathname === '/') {
                                    document.getElementById('harvesting-now')?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                    navigate('/');
                                    setTimeout(() => {
                                        document.getElementById('harvesting-now')?.scrollIntoView({ behavior: 'smooth' });
                                    }, 100);
                                }
                            }}
                            className="bg-brand-accent text-brand-primary hover:bg-white hover:text-brand-primary px-4 py-2 rounded-full transition-all duration-300 shadow-lg shadow-brand-accent/20 flex items-center gap-2 transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <span className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></span>
                            Harvesting Now
                        </button>
                    </div>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="relative flex items-center">
                            <div className={`
                                flex items-center transition-all duration-300 ease-in-out
                                ${isSearchOpen ? 'w-48 sm:w-64 opacity-100 mr-2 overflow-visible' : 'w-0 opacity-0 overflow-hidden'}
                            `}>
                                <form
                                    onSubmit={handleSearch}
                                    className="w-full relative"
                                >
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className={`w-full border rounded-full py-1.5 pl-3 pr-8 text-sm focus:outline-none focus:border-brand-primary dark:focus:border-brand-accent placeholder:text-gray-400
                                            ${showScrolledStyle
                                                ? 'bg-white/10 dark:bg-white/5 border-gray-200 dark:border-white/10 text-brand-primary dark:text-gray-200'
                                                : 'bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30'
                                            }
                                        `}
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className={`absolute right-2 top-1/2 -translate-y-1/2 ${showScrolledStyle ? 'text-gray-400 hover:text-brand-primary dark:hover:text-white' : 'text-white/60 hover:text-white'}`}
                                        >
                                            <X size={14} />
                                        </button>
                                    )}

                                    {/* Search Suggestions Dropdown */}
                                    {searchQuery && (
                                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#1A1D23] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50 animate-fade-in-up">
                                            {products
                                                .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                                .slice(0, 5) // Limit to 5 results
                                                .map(product => (
                                                    <Link
                                                        key={product.id}
                                                        to={`/product/${product.id}`}
                                                        onClick={() => {
                                                            setIsSearchOpen(false);
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
                            <button
                                onClick={() => {
                                    if (isSearchOpen && searchQuery) {
                                        handleSearch(new Event('submit'));
                                    } else {
                                        setIsSearchOpen(!isSearchOpen);
                                    }
                                }}
                                className={`
                                    hidden sm:block p-2 rounded-full transition-all
                                    ${isSearchOpen
                                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90'
                                        : showScrolledStyle
                                            ? 'text-brand-primary dark:text-gray-300 hover:text-brand-accent dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10'
                                            : 'text-white hover:bg-white/10 hover:text-white'}
                                `}
                            >
                                <Search size={20} />
                            </button>
                        </div>

                        <Link to="/wishlist" className={`relative p-2 rounded-full transition-all ${showScrolledStyle ? 'text-brand-primary dark:text-gray-300 hover:text-brand-accent dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}>
                            <Heart size={20} />
                            {wishlist.length > 0 && (
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-[#1A1D23]"></span>
                            )}
                        </Link>

                        <Link to={user ? "/profile" : "/login"} className={`hidden md:block p-2 rounded-full transition-all ${showScrolledStyle ? 'text-brand-primary dark:text-gray-300 hover:text-brand-accent dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}>
                            <User size={20} />
                        </Link>

                        {/* Dark Mode Toggle */}
                        <button
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all ${showScrolledStyle ? 'text-brand-primary dark:text-gray-300 hover:text-brand-accent dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <button
                            onClick={onCartClick}
                            className={`p-2 rounded-full transition-all relative group ${showScrolledStyle ? 'text-brand-primary dark:text-brand-accent hover:text-brand-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'}`}
                        >
                            <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                            <div className={`absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full border-2 ${showScrolledStyle ? 'bg-brand-accent border-white dark:border-[#1F2833]' : 'bg-brand-accent border-transparent'}`}></div>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
