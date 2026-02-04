import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onClose }) => {
    const icons = {
        success: <CheckCircle2 className="text-emerald-500" size={20} />,
        error: <AlertCircle className="text-red-500" size={20} />,
        info: <Info className="text-blue-500" size={20} />,
        warning: <AlertTriangle className="text-amber-500" size={20} />
    };

    const colors = {
        success: 'border-emerald-500/20 bg-emerald-50 dark:bg-emerald-950/20',
        error: 'border-red-500/20 bg-red-50 dark:bg-red-950/20',
        info: 'border-blue-500/20 bg-blue-50 dark:bg-blue-950/20',
        warning: 'border-amber-500/20 bg-amber-50 dark:bg-amber-950/20'
    };

    return (
        <div className={`
            ${colors[toast.type]}
            pointer-events-auto
            flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl
            animate-fade-in-up transition-all duration-300 min-w-[320px] max-w-md
        `}>
            <div className="shrink-0">{icons[toast.type]}</div>
            <p className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                {toast.message}
            </p>
            <button
                onClick={onClose}
                className="shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
                <X size={16} />
            </button>
        </div>
    );
};
