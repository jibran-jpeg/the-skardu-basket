import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { CheckCircle, Package, Mail, Phone, MapPin, Calendar, CreditCard, Truck, Loader2, AlertCircle, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

export function OrderConfirmation() {
    const { orderNumber } = useParams();
    const navigate = useNavigate();
    const { getOrderByNumber } = useOrders();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrder();
        triggerConfetti();
    }, [orderNumber]);

    const loadOrder = async () => {
        if (!orderNumber) {
            navigate('/');
            return;
        }

        const orderData = await getOrderByNumber(orderNumber);
        if (orderData) {
            setOrder(orderData);
        } else {
            // Order not found
            setTimeout(() => navigate('/'), 3000);
        }
        setLoading(false);
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#0B0C10', '#C5C6C7', '#D4AF37']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#0B0C10', '#C5C6C7', '#D4AF37']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
            processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
            shipped: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
            delivered: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
        };
        return colors[status] || colors.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10] px-4">
                <Loader2 size={48} className="text-brand-primary dark:text-brand-accent animate-spin mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading your order...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10] px-4">
                <AlertCircle size={64} className="text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find an order with this number.</p>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:bg-brand-primary/90 transition-all"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12 bg-gray-50 dark:bg-[#0B0C10] px-4">
            <div className="max-w-3xl mx-auto">
                {/* Success Header */}
                <div className="bg-white dark:bg-[#1F2833] rounded-3xl p-8 md:p-12 text-center mb-8 shadow-lg border border-gray-100 dark:border-white/5">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-75"></div>
                            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400 relative z-10" />
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Thank you for your order. We've received it and will process it shortly.
                    </p>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Order Number</p>
                        <p className="text-2xl font-bold text-brand-primary dark:text-brand-accent font-mono tracking-wider">
                            {order.order_number}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">Save this number for tracking your order</p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white dark:bg-[#1F2833] rounded-2xl p-6 md:p-8 mb-6 shadow-sm border border-gray-100 dark:border-white/5">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Package size={20} className="text-brand-primary dark:text-brand-accent" />
                        Order Details
                    </h2>

                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                        {order.items?.map((item, index) => (
                            <div key={index} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-white/5 last:border-0">
                                {item.product_image && (
                                    <img
                                        src={item.product_image}
                                        alt={item.product_name}
                                        className="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-white/5"
                                    />
                                )}
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white text-sm">{item.product_name}</h3>
                                    {item.variant && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Variant: {item.variant}</p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-900 dark:text-white">PKR {item.subtotal}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="pt-4 border-t border-gray-200 dark:border-white/10 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-medium text-gray-900 dark:text-white">PKR {order.subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                            <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-white/10">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-brand-primary dark:text-brand-accent">PKR {order.total}</span>
                        </div>
                    </div>
                </div>

                {/* Customer & Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-[#1F2833] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Customer Information</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <Mail size={16} className="text-gray-400 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-300">{order.customer_email}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone size={16} className="text-gray-400 mt-0.5" />
                                <span className="text-gray-600 dark:text-gray-300">{order.customer_phone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Info */}
                    <div className="bg-white dark:bg-[#1F2833] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Shipping Address</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-gray-400 mt-0.5" />
                                <div className="text-gray-600 dark:text-gray-300">
                                    <p>{order.shipping_address}</p>
                                    <p>{order.city}, Pakistan</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment & Status */}
                <div className="bg-white dark:bg-[#1F2833] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Order Status</p>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Payment Method</p>
                            <div className="flex items-center gap-2">
                                {order.payment_method === 'cod' ? <Truck size={16} /> : <CreditCard size={16} />}
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Order Date</p>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Bank Transfer Note */}
                    {order.payment_method === 'bank_transfer' && (
                        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-800 dark:text-amber-200">
                                    <p className="font-bold mb-2">Payment Required</p>
                                    <p className="mb-3">Please transfer the amount to our bank account:</p>
                                    <div className="bg-white dark:bg-white/10 p-3 rounded-lg space-y-1 text-xs">
                                        <p><span className="font-semibold">Bank:</span> Mezan Bank</p>
                                        <p><span className="font-semibold">Account Title:</span> The Skardu Basket</p>
                                        <p><span className="font-semibold">Account No:</span> 0101-XXXXXXXX</p>
                                    </div>
                                    <a
                                        href="https://wa.me/923001234567"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-colors text-xs"
                                    >
                                        Send Payment Screenshot on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/track-order"
                        className="flex-1 py-3 px-6 bg-brand-primary text-white rounded-xl font-bold text-center hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                    >
                        Track Order <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/"
                        className="flex-1 py-3 px-6 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white rounded-xl font-bold text-center hover:bg-gray-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        <Home size={16} /> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
