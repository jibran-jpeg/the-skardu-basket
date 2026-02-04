import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import confetti from 'canvas-confetti';
import { CheckCircle, ShieldCheck, Truck, Package, ArrowRight, AlertCircle, CreditCard, ShoppingBag } from 'lucide-react';

export function Checkout() {
    const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
    const { createOrder } = useOrders();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    // Check for restricted items (Seasonal Fruits)
    const hasRestrictedItems = cartItems.some(item => item.categoryId === 'seasonal-fruits');

    // Form state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        phone: '',
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');

    // Force bank transfer if restricted items are present
    useEffect(() => {
        if (hasRestrictedItems) {
            setPaymentMethod('bank_transfer');
        } else {
            // Reset to COD if no restricted items (optional, but good for UX if user removes items)
            if (paymentMethod === 'bank_transfer' && !hasRestrictedItems) {
                setPaymentMethod('cod');
            }
        }
    }, [hasRestrictedItems]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare order data
        const orderData = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postalCode: '',
            notes: '',
            subtotal: getCartTotal(),
            shippingCost: 0,
            total: getCartTotal(),
            paymentMethod
        };

        // Create order in database
        const result = await createOrder(orderData, cartItems);

        if (result.success) {
            setOrderNumber(result.orderNumber);
            setOrderPlaced(true);
            clearCart();

            // Redirect to order confirmation page
            setTimeout(() => {
                navigate(`/order-confirmation/${result.orderNumber}`);
            }, 2000);
        }
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10] px-4">
                <div className="bg-white dark:bg-[#1F2833] p-12 max-w-md w-full text-center rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 animate-fade-in-up">
                    <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-serif text-primary dark:text-[#F5F5F5] font-semibold mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-light">Looks like you haven't added any items yet.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-brand-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-dark transition-all shadow-sm hover:shadow-md"
                    >
                        Start Shopping
                    </button>
                </div>
            </div>
        );
    }

    if (orderPlaced) {
        // Trigger confetti
        useEffect(() => {
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#0B0C10', '#C5C6C7', '#D4AF37'] // Brand colors
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
        }, []);

        return (
            <div className="min-h-screen pt-32 pb-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B0C10] px-4 animate-fade-in-up">
                <div className="bg-white dark:bg-[#1F2833] p-8 md:p-12 text-center max-w-lg w-full rounded-[30px] shadow-2xl border border-gray-100 dark:border-white/5 relative overflow-hidden">
                    {/* Decorative Background Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="flex justify-center mb-8">
                            <div className="w-24 h-24 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center relative">
                                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping opacity-75"></div>
                                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400 relative z-10" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-serif text-brand-primary dark:text-white font-bold mb-2">Order Confirmed!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 font-light">
                            Thank you, <span className="font-bold text-brand-primary dark:text-brand-accent">{formData.firstName}</span>. Your order has been received.
                        </p>

                        <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl text-left mb-8 border border-gray-100 dark:border-white/5">
                            <p className="text-xs text-brand-primary dark:text-brand-accent uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                                <AlertCircle size={12} /> Next Steps
                            </p>

                            {paymentMethod === 'bank_transfer' ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-brand-primary/5 dark:bg-white/5 border border-brand-primary/10 dark:border-white/10 rounded-xl">
                                        <h3 className="font-bold text-brand-primary dark:text-white mb-2 flex items-center gap-2 text-sm">
                                            <CreditCard className="w-4 h-4" /> Bank Transfer Details
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-6">
                                            <p><span className="font-semibold">Bank:</span> Mezan Bank</p>
                                            <p><span className="font-semibold">Account Title:</span> The Skardu Basket</p>
                                            <p><span className="font-semibold">Account No:</span> 0101-XXXXXXXX</p>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                        <p className="mb-3">Please send a screenshot of your payment to confirm your order.</p>
                                        <a
                                            href="https://wa.me/923001234567"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full inline-flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                                        >
                                            Verify on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-center justify-between mb-4 p-4 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5">
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Payment Method</p>
                                            <div className="flex items-center gap-2 text-brand-primary dark:text-white font-bold text-sm">
                                                <Truck className="w-4 h-4" />
                                                Cash on Delivery
                                            </div>
                                        </div>
                                        <div className="h-8 w-px bg-gray-200 dark:bg-white/10"></div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Estimated Delivery</p>
                                            <p className="text-brand-primary dark:text-white font-bold text-sm">3-5 Days</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light text-center">
                                        We will contact you shortly to confirm your shipping address.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3">
                            <button className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                Track Order Status
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full py-4 text-gray-500 dark:text-gray-400 font-medium hover:text-brand-primary dark:hover:text-white transition-colors text-sm"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-[#0B0C10]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-serif text-gray-900 dark:text-[#F5F5F5] font-bold mb-2">Checkout</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-light">Complete your purchase</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    {/* Left Column: Shipping Information */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Shipping Section */}
                        <section aria-labelledby="shipping-heading">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-medium">1</div>
                                <h2 id="shipping-heading" className="text-xl font-serif text-gray-900 dark:text-[#F5F5F5] font-semibold">Shipping Details</h2>
                            </div>

                            <div className="bg-white dark:bg-[#1F2833] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                                placeholder=""
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                            placeholder=""
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Street Address</label>
                                        <input
                                            type="text"
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                            placeholder=""
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">City</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                                placeholder=""
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-colors text-gray-900 dark:text-white placeholder-gray-400/70"
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>

                        {/* Payment Section */}
                        <section aria-labelledby="payment-heading">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center text-sm font-medium">2</div>
                                <h2 id="payment-heading" className="text-xl font-serif text-gray-900 dark:text-[#F5F5F5] font-semibold">Payment Method</h2>
                            </div>

                            <div className="bg-white dark:bg-[#1F2833] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-4">

                                {hasRestrictedItems && (
                                    <div className="flex items-start gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 rounded-lg border border-amber-200 dark:border-amber-800">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm">
                                            <p className="font-semibold mb-1">Cash on Delivery Unavailable</p>
                                            <p>Because your cart contains fresh Seasonal Fruits, we require advance payment to ensure safe delivery and freshness.</p>
                                        </div>
                                    </div>
                                )}

                                {/* COD Option */}
                                <label className={`flex items-start cursor-pointer group p-4 border rounded-xl transition-all ${paymentMethod === 'cod' ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 dark:border-gray-700'} ${hasRestrictedItems ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800' : 'hover:border-brand-primary/50'}`}>
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={handlePaymentChange}
                                            disabled={hasRestrictedItems}
                                            className="w-4 h-4 text-brand-primary border-gray-300 focus:ring-brand-primary dark:focus:ring-offset-gray-900 disabled:text-gray-400"
                                        />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className={`font-medium ${hasRestrictedItems ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>Cash on Delivery</span>
                                            <Truck className={`w-5 h-5 ${hasRestrictedItems ? 'text-gray-400' : 'text-brand-primary'}`} />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Pay with cash when your order arrives.</p>
                                    </div>
                                </label>

                                {/* Bank Transfer Option */}
                                <label className={`flex items-start cursor-pointer group p-4 border rounded-xl transition-all ${paymentMethod === 'bank_transfer' ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-200 dark:border-gray-700 hover:border-brand-primary/50'}`}>
                                    <div className="flex items-center h-5 mt-1">
                                        <input
                                            type="radio"
                                            name="payment-method"
                                            value="bank_transfer"
                                            checked={paymentMethod === 'bank_transfer'}
                                            onChange={handlePaymentChange}
                                            className="w-4 h-4 text-brand-primary border-gray-300 focus:ring-brand-primary dark:focus:ring-offset-gray-900"
                                        />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-gray-900 dark:text-white">Advance Payment / Bank Transfer</span>
                                            <CreditCard className="w-5 h-5 text-brand-primary" />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Transfer directly to our bank account. Details provided after confirmation.</p>
                                    </div>
                                </label>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5 lg:sticky lg:top-32">
                        <section aria-labelledby="summary-heading" className="bg-white dark:bg-[#1F2833] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                            <h2 id="summary-heading" className="text-lg font-serif font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                            <div className="flow-root mb-8">
                                <ul className="divide-y divide-dashed divide-gray-200 dark:divide-gray-700 -my-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cartItems.map((item) => (
                                        <li key={item.id} className="flex py-4">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50">
                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                                                        <h3>{item.name}</h3>
                                                        <p className="ml-4 tabular-nums">PKR {item.price * item.quantity}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Qty {item.quantity}</p>
                                                    {item.categoryId === 'seasonal-fruits' && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 mt-1">
                                                            Fresh Item
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-4">
                                <div className="flex items-center justify-between text-sm">
                                    <p className="text-gray-600 dark:text-gray-400">Subtotal</p>
                                    <p className="font-medium text-gray-900 dark:text-white tabular-nums">PKR {getCartTotal()}</p>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <p className="text-gray-600 dark:text-gray-400">Shipping</p>
                                    <p className="font-medium text-brand-primary">Free</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                                    <p className="text-lg font-bold text-gray-900 dark:text-white">Total</p>
                                    <p className="text-xl font-bold text-brand-primary tabular-nums">PKR {getCartTotal()}</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                form="checkout-form"
                                className="w-full mt-8 bg-brand-primary border border-transparent rounded-xl shadow-sm py-4 px-4 text-sm font-bold text-white uppercase tracking-wide hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all hover:shadow-lg"
                            >
                                {paymentMethod === 'bank_transfer' ? 'Place Order & Pay' : 'Confirm Order'}
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Secure transaction via SSL</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
