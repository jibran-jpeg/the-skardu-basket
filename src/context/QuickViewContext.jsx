import React, { createContext, useContext, useState } from 'react';
import { QuickView } from '../components/QuickView';

const QuickViewContext = createContext();

export function useQuickView() {
    return useContext(QuickViewContext);
}

export function QuickViewProvider({ children }) {
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openQuickView = (product) => {
        setSelectedProduct(product);
    };

    const closeQuickView = () => {
        setSelectedProduct(null);
    };

    return (
        <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
            {children}
            {selectedProduct && (
                <QuickView product={selectedProduct} onClose={closeQuickView} />
            )}
        </QuickViewContext.Provider>
    );
}
