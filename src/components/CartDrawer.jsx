import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';

export function CartDrawer({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white dark:bg-[#0B0C10] shadow-2xl z-[100] transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    {/* Header */}
                    <div className="flex items-center justify-between p-8 border-b border-gray-100 dark:border-white/10">
                        <h2 className="text-2xl font-serif text-brand-primary dark:text-[#F5F5F5] font-bold tracking-wide uppercase">Shopping Basket</h2>
                        <button onClick={onClose} className="p-2 -mr-2 text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-6 animate-fade-in">
                                <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-4xl opacity-50">🛍️</span>
                                </div>
                                <p className="text-lg font-serif">Your basket is empty.</p>
                                <button
                                    onClick={onClose}
                                    className="text-brand-primary dark:text-brand-accent font-bold uppercase tracking-widest text-sm hover:underline transition-all"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="flex gap-6 group animate-fade-in-up">
                                    <div className="w-24 h-28 flex-shrink-0 bg-gray-50 dark:bg-white/5 rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/10">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-brand-primary dark:text-white font-serif font-bold text-lg leading-tight line-clamp-2 pr-4">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-300 hover:text-red-500 transition-colors -mt-1 -mr-1 p-1"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <p className="text-brand-accent font-bold mt-2 text-sm">PKR {item.price}</p>
                                        </div>

                                        <div className="flex items-center mt-4">
                                            <div className="flex items-center bg-gray-50 dark:bg-white/5 rounded-full p-1 border border-gray-200 dark:border-white/10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-transparent shadow-sm dark:shadow-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    <Minus size={12} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-transparent shadow-sm dark:shadow-none text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                                                >
                                                    <Plus size={12} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-8 border-t border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-6">
                                <span className="uppercase tracking-widest text-xs font-bold text-gray-500 dark:text-gray-400">Subtotal</span>
                                <span className="text-2xl font-serif font-bold text-brand-primary dark:text-white">PKR {getCartTotal()}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-brand-primary text-white py-5 font-bold uppercase tracking-[0.2em] text-sm hover:bg-brand-primary/90 transition-all duration-300 shadow-xl hover:shadow-brand-primary/25 rounded-[20px] hover:-translate-y-1"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
