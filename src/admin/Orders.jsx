import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, Eye, Package, Clock, CheckCircle, XCircle, Truck, Calendar } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { supabase } from '../lib/supabase';

export function Orders() {
    const { getAllOrders, updateOrderStatus } = useOrders();
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Fetch orders on mount
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const fetchedOrders = await getAllOrders();

            // Fetch order items for each order
            const ordersWithItems = await Promise.all(
                (fetchedOrders || []).map(async (order) => {
                    const { data: items } = await supabase
                        .from('order_items')
                        .select('*')
                        .eq('order_id', order.id);

                    return { ...order, items: items || [] };
                })
            );

            setOrders(ordersWithItems);
            setFilteredOrders(ordersWithItems);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
            setFilteredOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter and search logic
    useEffect(() => {
        let filtered = [...orders];

        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(order =>
                order.order_number.toLowerCase().includes(query) ||
                order.customer_name.toLowerCase().includes(query) ||
                order.customer_email.toLowerCase().includes(query)
            );
        }

        setFilteredOrders(filtered);
    }, [searchQuery, statusFilter, orders]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        const result = await updateOrderStatus(orderId, newStatus);
        if (result.success) {
            // Refresh orders
            fetchOrders();
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'processing': return <Package size={16} />;
            case 'shipped': return <Truck size={16} />;
            case 'delivered': return <CheckCircle size={16} />;
            case 'cancelled': return <XCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
            case 'delivered': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20';
            default: return 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const statusOptions = [
        { value: 'all', label: 'All Orders' },
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Order Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage and track all customer orders</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-brand-primary/10 text-brand-primary dark:text-brand-accent rounded-xl text-sm font-bold">
                        {filteredOrders.length} Orders
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/5 p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by order number, customer name, or email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0B0C10] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none transition-all text-gray-800 dark:text-gray-200 placeholder-gray-400"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-12 pr-10 py-3 bg-gray-50 dark:bg-[#0B0C10] border border-gray-200 dark:border-white/10 rounded-2xl text-sm focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 outline-none transition-all text-gray-800 dark:text-gray-200 appearance-none cursor-pointer"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>
            </div>

            {/* Orders Table/List */}
            {filteredOrders.length === 0 ? (
                <div className="bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/5 p-16 text-center">
                    <Package size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Try adjusting your filters'
                            : 'Orders will appear here once customers place them'}
                    </p>
                </div>
            ) : (
                <>
                    {/* Desktop Table */}
                    <div className="hidden lg:block bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-white/5 overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50/50 dark:bg-black/20 border-b border-gray-100 dark:border-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Order</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Customer</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Items</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm">
                                                        {order.order_number.slice(-4)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 dark:text-white">#{order.order_number}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{order.customer_name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{order.customer_email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-600 dark:text-gray-300">{order.items?.length || 0} items</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">PKR {order.total?.toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider cursor-pointer ${getStatusStyles(order.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                                    <Calendar size={14} />
                                                    {formatDate(order.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowDetailsModal(true);
                                                    }}
                                                    className="p-2 hover:bg-brand-primary/10 rounded-lg transition-colors text-brand-primary"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {filteredOrders.map((order) => (
                            <div key={order.id} className="bg-white/60 dark:bg-[#1F2833]/60 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/5 p-5 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">#{order.order_number}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(order.created_at)}</p>
                                    </div>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusStyles(order.status)}`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Customer:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{order.customer_name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Items:</span>
                                        <span className="font-medium text-gray-900 dark:text-white">{order.items?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Total:</span>
                                        <span className="font-bold text-brand-primary dark:text-brand-accent">PKR {order.total?.toLocaleString()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedOrder(order);
                                        setShowDetailsModal(true);
                                    }}
                                    className="w-full py-2 bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} />
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Order Details Modal */}
            {showDetailsModal && selectedOrder && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
                    <div className="bg-white dark:bg-[#1F2833] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100 dark:border-white/10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">Order Details</h2>
                                <button onClick={() => setShowDetailsModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
                                    <XCircle size={24} className="text-gray-400" />
                                </button>
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Order Info */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Order Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Order Number</p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">#{selectedOrder.order_number}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Date</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.created_at)}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Status</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusStyles(selectedOrder.status)}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total</p>
                                        <p className="text-sm font-bold text-brand-primary dark:text-brand-accent">PKR {selectedOrder.total?.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Customer Information</h3>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.customer_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.customer_email}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedOrder.customer_phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Address</p>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {selectedOrder.address}, {selectedOrder.city}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">Order Items</h3>
                                <div className="space-y-3">
                                    {selectedOrder.items?.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{item.product_name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 dark:text-white">PKR {item.price?.toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
