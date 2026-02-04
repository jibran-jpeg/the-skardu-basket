import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle,
    XCircle,
    Calendar,
    ArrowRight,
    Download
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import { supabase } from '../lib/supabase';

export function Dashboard() {
    const navigate = useNavigate();
    const { getAllOrders } = useOrders();
    const { products } = useProducts();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                // Fetch orders
                const fetchedOrders = await getAllOrders();

                // Fetch order items for each order
                const ordersWithItems = await Promise.all(
                    (fetchedOrders || []).map(async (order) => {
                        const { data: items } = await supabase
                            .from('order_items')
                            .select('*')
                            .eq('order_id', order.id)
                            .limit(1); // Only get first item for display

                        return { ...order, items: items || [] };
                    })
                );

                setOrders(ordersWithItems);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrders = orders.length;
    const uniqueCustomers = new Set(orders.map(order => order.customer_email)).size;
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get top performing city
    const cityStats = orders.reduce((acc, order) => {
        const city = order.city || 'Unknown';
        if (!acc[city]) {
            acc[city] = { count: 0, revenue: 0 };
        }
        acc[city].count++;
        acc[city].revenue += order.total || 0;
        return acc;
    }, {});

    const topCity = Object.entries(cityStats)
        .sort((a, b) => b[1].revenue - a[1].revenue)[0];

    const topCityName = topCity ? topCity[0] : 'N/A';
    const topCityRevenue = topCity ? topCity[1].revenue : 0;
    const topCityPercentage = totalRevenue > 0 ? Math.round((topCityRevenue / totalRevenue) * 100) : 0;

    const stats = [
        {
            label: 'Total Revenue',
            value: `PKR ${totalRevenue.toLocaleString()}`,
            change: '+12.5%',
            isPositive: true,
            icon: DollarSign,
            theme: 'from-emerald-400 to-emerald-600'
        },
        {
            label: 'Total Orders',
            value: totalOrders.toString(),
            change: '+8.2%',
            isPositive: true,
            icon: ShoppingBag,
            theme: 'from-blue-400 to-blue-600'
        },
        {
            label: 'Active Customers',
            value: uniqueCustomers.toString(),
            change: '-2.4%',
            isPositive: false,
            icon: Users,
            theme: 'from-brand-primary to-brand-dark'
        },
        {
            label: 'Avg. Order Value',
            value: `PKR ${Math.round(avgOrderValue).toLocaleString()}`,
            change: '+4.1%',
            isPositive: true,
            icon: TrendingUp,
            theme: 'from-amber-400 to-amber-600'
        }
    ];

    // Format recent orders
    const formatTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} mins ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    const getStatusDisplay = (status) => {
        const statusMap = {
            'pending': 'Pending',
            'processing': 'Processing',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || status;
    };

    const recentOrders = orders.slice(0, 5).map(order => ({
        id: `#${order.order_number}`,
        customer: order.customer_name,
        product: order.items?.[0]?.product_name || 'Multiple Items',
        amount: `PKR ${order.total?.toLocaleString()}`,
        status: getStatusDisplay(order.status),
        date: formatTimeAgo(order.created_at)
    }));

    // Export Report Handler
    const handleExportReport = () => {
        const csvContent = [
            ['Order Number', 'Customer', 'Email', 'Total', 'Status', 'Date'],
            ...orders.map(order => [
                order.order_number,
                order.customer_name,
                order.customer_email,
                order.total,
                order.status,
                new Date(order.created_at).toLocaleDateString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `orders-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'Processing': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'Pending': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'Cancelled': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
            default: return 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10';
        }
    };

    // Calculate Quick Insights data
    const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const cancelledOrdersCount = orders.filter(o => o.status === 'cancelled').length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fade-in-up max-w-[1600px] mx-auto relative z-10">

            {/* Greeting */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-2 tracking-tight drop-shadow-sm">
                        Mountain Harvest <span className="text-brand-primary dark:text-brand-accent italic relative">
                            Analytics
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-brand-primary/20 dark:bg-brand-accent/50 rounded-full blur-sm"></span>
                        </span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 text-lg">
                        <Calendar size={18} className="text-brand-primary dark:text-brand-accent" />
                        Saturday, January 31, 2026
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportReport}
                        className="px-6 py-3 bg-white/60 dark:bg-black/20 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-2xl text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm hover:shadow-lg flex items-center gap-2 group"
                    >
                        <Download size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                        Export Report
                    </button>
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="px-6 py-3 bg-brand-primary text-white rounded-2xl text-xs font-bold shadow-xl shadow-brand-primary/20 hover:scale-[1.03] active:scale-[0.98] transition-all hover:shadow-brand-primary/40 flex items-center gap-2 group"
                    >
                        <span>New Product</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="relative group bg-white/60 dark:bg-[#1F2833]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-white/40 dark:border-white/5 hover:border-brand-primary/30 dark:hover:border-brand-accent/30 shadow-xl shadow-gray-100/50 dark:shadow-[0_0_40px_-10px_rgba(224,159,62,0.1)] transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1"
                    >
                        {/* Organic Circle Decor */}
                        <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${stat.theme} opacity-[0.08] group-hover:opacity-[0.2] rounded-full blur-3xl transition-all duration-700 group-hover:scale-125`}></div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 bg-gradient-to-br ${stat.theme} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/10 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ring-4 ring-white/50 dark:ring-black/20`}>
                                    <stat.icon size={24} />
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm ${stat.isPositive
                                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                    : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                                    }`}>
                                    {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </div>
                            </div>
                            <h3 className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">{stat.label}</h3>
                            <p className="text-3xl font-serif font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-brand-primary dark:group-hover:text-brand-accent transition-colors">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Orders List (Spans 2 columns) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Recent Transactions</h2>
                        <button
                            onClick={() => navigate('/admin/orders')}
                            className="group flex items-center gap-2 text-xs font-bold text-brand-primary hover:text-brand-dark transition-colors px-4 py-2 hover:bg-brand-primary/5 rounded-lg"
                        >
                            VIEW ALL ORDERS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/5 overflow-hidden shadow-sm relative">
                        {/* Table Background Decor */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="overflow-x-auto relative z-10 p-2">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-white/5">
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Order Info</th>
                                        <th className="px-6 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Items</th>
                                        <th className="px-6 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">Status</th>
                                        <th className="px-8 py-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="group hover:bg-white/50 dark:hover:bg-white/5 transition-all cursor-pointer rounded-2xl hover:shadow-none hover:scale-[1.01] duration-300 border-transparent border hover:border-gray-200 dark:hover:border-white/5">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/10 flex items-center justify-center text-sm font-bold text-brand-primary font-serif group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                                                        {order.customer.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-none mb-1.5">{order.customer}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase">{order.id} • {order.date}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium line-clamp-1 max-w-[180px]">
                                                    {order.product}
                                                </p>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold border uppercase tracking-wider backdrop-blur-sm shadow-sm ${getStatusStyles(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white font-serif">{order.amount}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">Store Performance</h2>
                        <div className="bg-brand-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-shadow duration-500">
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
                            <div className="absolute top-0 right-0 w-56 h-56 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000"></div>

                            <div className="relative z-10">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-6 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                                    Top Performing City
                                </p>
                                <h3 className="text-4xl font-serif font-bold mb-3">{topCityName}</h3>
                                <p className="text-sm text-white/80 mb-10 border-l-2 border-brand-accent pl-5 leading-relaxed">
                                    {totalRevenue > 0 ? (
                                        <>This city is driving <strong className="text-white">{topCityPercentage}% of total revenue</strong> with PKR {topCityRevenue.toLocaleString()} in sales.</>
                                    ) : (
                                        <>No order data available yet.</>
                                    )}
                                </p>

                                <div className="space-y-5">
                                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div className={`h-full bg-brand-accent animate-pulse relative overflow-hidden`} style={{ width: `${topCityPercentage}%` }} title={topCityName}>
                                            <div className="absolute inset-0 bg-white/20 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white/90">
                                        <span>{topCityName} Sales</span>
                                        <span>{topCityPercentage}% Share</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white/60 dark:bg-[#1F2833]/80 backdrop-blur-xl rounded-[2.5rem] border border-white/40 dark:border-white/5 shadow-sm relative overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-primary opacity-50"></div>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest flex items-center justify-between">
                            Quick Insights
                            <TrendingUp size={16} className="text-brand-primary dark:text-brand-accent" />
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Total Products', val: products.length.toString(), color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                { label: 'Cancelled Orders', val: cancelledOrdersCount.toString(), color: 'text-red-500', bg: 'bg-red-500/10' },
                                { label: 'Low Stock Alerts', val: lowStockCount.toString(), color: 'text-amber-500', bg: 'bg-amber-500/10' }
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                    <span className="text-xs text-gray-500 font-bold uppercase tracking-wide group-hover:text-brand-primary transition-colors">{item.label}</span>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.color} ${item.bg}`}>{item.val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
