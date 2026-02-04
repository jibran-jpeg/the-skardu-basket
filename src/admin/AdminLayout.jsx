import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingBag,
    Package,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronRight,
    Search,
    Sun,
    Moon,
    MessageSquare,
    Warehouse
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { toggleTheme, isDarkMode } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1024);

    useEffect(() => {
        const isAuth = localStorage.getItem('admin_auth');
        if (!isAuth) {
            navigate('/admin');
        }

        const handleResize = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (!mobile) setIsSidebarOpen(false);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_auth');
        navigate('/admin');
    };

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
        { path: '/admin/products', icon: Package, label: 'Products' },
        { path: '/admin/inventory', icon: Warehouse, label: 'Inventory' },
        { path: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path) => location.pathname === path;
    const currentPage = navItems.find(item => isActive(item.path))?.label || 'Admin';

    return (
        <div className="min-h-screen font-sans text-gray-900 dark:text-gray-100 selection:bg-brand-accent/30 flex relative overflow-x-hidden bg-[#F9F8F4] dark:bg-[#0B0C10] transition-colors duration-500">

            {/* Ambient Background - Adaptive */}
            <div className="fixed inset-0 z-0 bg-[#F9F8F4] dark:bg-[#0B0C10] pointer-events-none transition-colors duration-500">
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-brand-accent/5 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar with Enhanced Premium Glassmorphism - Adaptive */}
            <aside
                className={`
                    fixed lg:fixed inset-y-0 left-0 z-50
                    w-72 lg:w-72 bg-white/80 dark:bg-[#0B0C10]/90 backdrop-blur-2xl text-gray-900 dark:text-white flex flex-col
                    transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) border-r border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/50 dark:shadow-black/50
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Brand Header - Matching Main Website */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-brand-primary/10 dark:bg-brand-primary/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                        <Link to="/" className="flex flex-col items-center group">
                            <h1 className="text-3xl lg:text-4xl leading-tight text-center">
                                <span className="font-serif font-bold text-brand-primary dark:text-brand-accent block">The Skardu</span>
                                <span className="font-script text-brand-accent dark:text-white text-2xl lg:text-3xl font-light tracking-wide block -mt-1 italic">Basket</span>
                            </h1>
                        </Link>
                        {isMobile && (
                            <button onClick={() => setIsSidebarOpen(false)} className="absolute right-0 top-0 text-gray-400 hover:text-gray-900 dark:text-white/60 dark:hover:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Navigation - Compact and No Scroll */}
                <nav className="flex-1 px-4 py-4 space-y-1.5">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                            className={`
                                group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
                                ${isActive(item.path)
                                    ? 'text-white bg-gradient-to-r from-brand-primary to-brand-primary/90 dark:from-brand-primary/20 dark:to-transparent border border-brand-primary/30 shadow-lg shadow-brand-primary/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white hover:pl-5 border border-transparent'
                                }
                            `}
                        >
                            {isActive(item.path) && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent shadow-[0_0_10px_2px_rgba(224,159,62,0.5)] rounded-r-full"></div>
                            )}

                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`p-1.5 rounded-lg transition-all duration-300 ${isActive(item.path) ? 'bg-white/20 dark:bg-brand-primary/20 text-white dark:text-brand-accent' : 'bg-gray-100 dark:bg-white/5 group-hover:bg-gray-200 dark:group-hover:bg-white/10 group-hover:text-brand-primary'}`}>
                                    <item.icon size={18} className={`${isActive(item.path) ? 'drop-shadow-[0_0_8px_rgba(224,159,62,0.6)]' : ''}`} />
                                </div>
                                <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${isActive(item.path) ? 'text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                                    {item.label}
                                </span>
                            </div>

                            {isActive(item.path) && (
                                <ChevronRight size={16} className="text-brand-accent" />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar Footer - Compact */}
                <div className="p-4 mt-auto relative z-10">
                    <div className="p-3 rounded-2xl bg-white/50 dark:bg-[#1F2833]/50 border border-gray-100 dark:border-white/10 mb-3 backdrop-blur-md relative overflow-hidden group hover:border-brand-primary/30 transition-colors">
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-dark flex items-center justify-center text-base font-bold font-serif text-white shadow-lg group-hover:scale-110 transition-transform">
                                A
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-[9px] uppercase tracking-widest text-brand-primary dark:text-brand-accent font-bold mb-0.5">Signed in as</p>
                                <p className="text-xs font-bold truncate text-gray-900 dark:text-white">Administrator</p>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse"></div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-red-500/80 hover:text-red-500 hover:bg-red-50 dark:text-red-400/80 dark:hover:text-red-400 dark:hover:bg-red-500/10 rounded-xl transition-all duration-300 font-bold text-xs border border-transparent hover:border-red-500/20 group"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Logout Safe Mode</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area - Adaptive */}
            <main className="flex-1 flex flex-col lg:pl-72 min-h-screen relative transition-all duration-300 w-full max-w-full overflow-x-hidden">

                {/* Header - Adaptive */}
                <header className="h-24 flex items-center justify-between px-4 md:px-10 sticky top-0 z-30 transition-all backdrop-blur-sm bg-white/80 dark:bg-[#0B0C10]/80">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden text-brand-primary p-2.5 hover:bg-brand-primary/5 rounded-xl transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="min-w-0 flex-1">
                            <div className="hidden md:flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                                <span>Overview</span>
                                <ChevronRight size={10} />
                                <span className="text-brand-primary">{currentPage}</span>
                            </div>
                            <h1 className="text-xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-tight truncate">{currentPage}</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="hidden md:flex items-center relative group">
                            <Search className="absolute left-4 text-gray-400 group-focus-within:text-brand-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search inventory..."
                                className="pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#1F2833] border border-gray-200 dark:border-white/5 rounded-2xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none w-64 transition-all shadow-sm text-gray-800 dark:text-gray-200 placeholder-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 pl-3 md:pl-6 md:border-l border-gray-200 dark:border-white/5">
                            {/* Restored Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 hover:text-brand-primary"
                                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500 dark:text-gray-400 hover:text-brand-primary">
                                <Bell size={20} />
                                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0B0C10]"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Dynamic Viewport */}
                <div className="flex-1 p-6 md:p-10 lg:p-12 animate-fade-in relative z-10">
                    <Outlet />
                </div>

                {/* Footer Decor */}
                <div className="fixed bottom-0 right-0 p-8 pointer-events-none opacity-5 dark:opacity-10 scale-150 transform translate-x-1/4 translate-y-1/4 z-0">
                    <img src="https://www.transparenttextures.com/patterns/leaf.png" alt="" className="invert dark:invert-0" />
                </div>
            </main>
        </div>
    );
}
