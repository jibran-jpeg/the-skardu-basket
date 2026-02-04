import React, { createContext, useContext, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useToast } from './ToastContext';
import { useProducts } from './ProductContext';

const OrderContext = createContext();

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within OrderProvider');
    }
    return context;
};

export function OrderProvider({ children }) {
    const { showToast } = useToast();
    const { checkStock, deductStock } = useProducts();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    // Generate unique order number: ORD-YYYYMMDD-XXXX
    const generateOrderNumber = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(1000 + Math.random() * 9000);
        return `ORD-${year}${month}${day}-${random}`;
    };

    // Create new order
    const createOrder = async (orderData, cartItems) => {
        try {
            // Step 1: Validate stock availability for all items
            const stockChecks = await Promise.all(
                cartItems.map(async (item) => {
                    const hasStock = await checkStock(item.id, item.quantity);
                    return { item, hasStock };
                })
            );

            const outOfStockItems = stockChecks.filter(check => !check.hasStock);
            if (outOfStockItems.length > 0) {
                const itemNames = outOfStockItems.map(check => check.item.name).join(', ');
                throw new Error(`Insufficient stock for: ${itemNames}`);
            }

            const orderNumber = generateOrderNumber();

            // Prepare order data
            const order = {
                order_number: orderNumber,
                customer_name: orderData.name,
                customer_email: orderData.email,
                customer_phone: orderData.phone,
                shipping_address: orderData.address,
                city: orderData.city,
                postal_code: orderData.postalCode || null,
                order_notes: orderData.notes || null,
                subtotal: orderData.subtotal,
                shipping_cost: orderData.shippingCost || 0,
                total: orderData.total,
                status: 'pending',
                payment_method: orderData.paymentMethod || 'cod'
            };

            // Insert order
            const { data: createdOrder, error: orderError } = await supabase
                .from('orders')
                .insert([order])
                .select()
                .single();

            if (orderError) throw orderError;

            // Prepare order items
            const orderItems = cartItems.map(item => ({
                order_id: createdOrder.id,
                product_id: item.id,
                product_name: item.name,
                product_image: item.image,
                variant: item.selectedVariant || null,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity
            }));

            // Insert order items
            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // Step 2: Deduct stock for all items
            const stockDeductions = await Promise.all(
                cartItems.map(async (item) => {
                    return await deductStock(item.id, item.quantity);
                })
            );

            // Check if any stock deduction failed
            const failedDeductions = stockDeductions.filter(result => !result.success);
            if (failedDeductions.length > 0) {
                console.error('Some stock deductions failed:', failedDeductions);
                // Order is still created, but stock may need manual adjustment
                showToast('Order placed, but stock update may need verification', 'warning');
            } else {
                showToast('Order placed successfully!', 'success');
            }

            return { success: true, orderNumber: createdOrder.order_number };
        } catch (error) {
            console.error('Error creating order:', error);
            showToast(`Failed to place order: ${error.message}`, 'error');
            return { success: false, error: error.message };
        }
    };

    // Get order by order number
    const getOrderByNumber = async (orderNumber) => {
        try {
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('order_number', orderNumber)
                .single();

            if (orderError) throw orderError;

            // Get order items
            const { data: items, error: itemsError } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', order.id);

            if (itemsError) throw itemsError;

            return { ...order, items };
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    };

    // Admin: Get all orders
    const getAllOrders = async () => {
        try {
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data);
            return data;
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    };

    // Admin: Get order by ID (with items)
    const getOrderById = async (orderId) => {
        try {
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (orderError) throw orderError;

            // Get order items
            const { data: items, error: itemsError } = await supabase
                .from('order_items')
                .select('*')
                .eq('order_id', orderId);

            if (itemsError) throw itemsError;

            return { ...order, items };
        } catch (error) {
            console.error('Error fetching order:', error);
            return null;
        }
    };

    // Admin: Update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const { error } = await supabase
                .from('orders')
                .update({ status: newStatus })
                .eq('id', orderId);

            if (error) throw error;

            showToast(`Order status updated to ${newStatus}`, 'success');
            return { success: true };
        } catch (error) {
            console.error('Error updating order status:', error);
            showToast(`Failed to update status: ${error.message}`, 'error');
            return { success: false };
        }
    };

    const value = {
        orders,
        loading,
        createOrder,
        getOrderByNumber,
        getAllOrders,
        getOrderById,
        updateOrderStatus
    };

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}
