import React, { useEffect, useState } from 'react';
import { User, Package, MapPin, CreditCard, LogOut, ChevronRight, Edit2, X, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export function Profile() {
    const { user, loading, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ name: '', phone: '' });
    const [editLoading, setEditLoading] = useState(false);
    const [editError, setEditError] = useState('');

    // Protect Route
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    // Fetch user's orders
    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;

            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select(`
                        id,
                        order_number,
                        total,
                        status,
                        created_at,
                        order_items (
                            product_name,
                            quantity
                        )
                    `)
                    .eq('customer_email', user.email)
                    .order('created_at', { ascending: false })
                    .limit(5);

                if (error) throw error;
                setOrders(data || []);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setOrdersLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    // Initialize edit form when modal opens
    useEffect(() => {
        if (showEditModal && user) {
            setEditForm({
                name: user.name || '',
                phone: user.phone || ''
            });
            setEditError('');
        }
    }, [showEditModal, user]);

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setEditLoading(true);
        setEditError('');

        const result = await updateProfile(editForm);

        if (result.success) {
            setShowEditModal(false);
        } else {
            setEditError(result.error || 'Failed to update profile');
        }
        setEditLoading(false);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
            processing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
            shipped: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
            delivered: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
            cancelled: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        };
        return colors[status] || colors.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-primary dark:text-gray-100 font-bold mb-10 text-center md:text-left">
                My Account
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Sidebar */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    {/* User Card */}
                    <div className="glass-panel p-6 flex flex-col items-center text-center">
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center mb-4 text-brand-primary dark:text-brand-accent">
                                <User size={48} />
                            </div>
                        )}
                        <h2 className="text-xl font-serif font-bold text-brand-primary dark:text-gray-100">{user.name || "User"}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{user.email}</p>
                        {user.phone && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{user.phone}</p>
                        )}

                        <button
                            onClick={() => setShowEditModal(true)}
                            className="w-full py-2 px-4 border border-brand-primary/20 text-brand-primary dark:text-gray-300 rounded-full hover:bg-brand-primary hover:text-white transition-colors text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                        >
                            <Edit2 size={16} />
                            Edit Profile
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <div className="glass-panel p-2">
                        <nav className="space-y-1">
                            <button className="w-full flex items-center space-x-3 px-4 py-3 bg-brand-primary/5 dark:bg-white/5 text-brand-primary dark:text-brand-accent font-bold rounded-lg transition-colors">
                                <Package size={20} />
                                <span>Orders</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-brand-primary dark:hover:text-gray-200 rounded-lg transition-colors">
                                <MapPin size={20} />
                                <span>Addresses</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-brand-primary dark:hover:text-gray-200 rounded-lg transition-colors">
                                <CreditCard size={20} />
                                <span>Payment Methods</span>
                            </button>
                            <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Sign Out</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="md:col-span-8 lg:col-span-9 space-y-8">
                    {/* Recent Orders Section */}
                    <div>
                        <h2 className="text-2xl font-serif text-brand-primary dark:text-gray-100 font-bold mb-6">Recent Orders</h2>

                        {ordersLoading ? (
                            <div className="glass-panel p-12 flex justify-center">
                                <div className="w-6 h-6 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="glass-panel p-12 text-center">
                                <Package size={48} className="mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400 text-lg">No orders yet</p>
                                <button
                                    onClick={() => navigate('/products')}
                                    className="mt-6 px-6 py-3 bg-brand-accent text-white rounded-full hover:bg-brand-accent/90 transition-colors font-bold"
                                >
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="glass-panel p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group hover:border-brand-accent/30 transition-colors cursor-pointer">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="text-lg font-bold text-brand-primary dark:text-white">{order.order_number}</span>
                                                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                            {order.order_items && order.order_items.length > 0 && (
                                                <p className="text-sm text-brand-primary dark:text-gray-300">
                                                    <span className="font-semibold">Items:</span>{' '}
                                                    {order.order_items.slice(0, 2).map(item => item.product_name).join(', ')}
                                                    {order.order_items.length > 2 && ` +${order.order_items.length - 2} more`}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                            <p className="text-lg font-bold text-brand-accent">PKR {order.total.toLocaleString()}</p>
                                            <ChevronRight size={24} className="text-gray-400 group-hover:text-brand-primary dark:group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
                    <div className="glass-panel max-w-md w-full p-8 space-y-6 animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-serif font-bold text-brand-primary dark:text-white">Edit Profile</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {editError && (
                            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm">
                                <AlertCircle size={18} />
                                <span>{editError}</span>
                            </div>
                        )}

                        <form onSubmit={handleEditProfile} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all dark:text-white"
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={editForm.phone}
                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent outline-none transition-all dark:text-white"
                                    placeholder="+92 300 1234567"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowEditModal(false)}
                                    className="flex-1 px-6 py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors font-bold"
                                    disabled={editLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={editLoading}
                                    className="flex-1 px-6 py-3 bg-brand-accent text-white rounded-xl hover:bg-brand-accent/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {editLoading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" />
                                    ) : (
                                        'Save Changes'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
