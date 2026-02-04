import React, { useEffect, useState } from 'react';
import { Check, AlertCircle, X, Info } from 'lucide-react';

const icons = {
    success: Check,
    error: AlertCircle,
    info: Info,
};

const styles = {
    success: 'bg-green-500/90 dark:bg-green-600/90 text-white shadow-green-500/20',
    error: 'bg-red-500/90 dark:bg-red-600/90 text-white shadow-red-500/20',
    info: 'bg-blue-500/90 dark:bg-blue-600/90 text-white shadow-blue-500/20',
};

export function Toast({ message, type = 'success', onClose }) {
    const Icon = icons[type];
    const style = styles[type];
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
    };

    return (
        <div
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md border border-white/10
                transition-all duration-300 transform
                ${style}
                ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'}
            `}
            role="alert"
        >
            <div className="p-1 bg-white/20 rounded-full">
                <Icon size={16} strokeWidth={3} />
            </div>
            <p className="text-sm font-bold tracking-wide pr-2">{message}</p>
            <button
                onClick={handleClose}
                className="p-1 hover:bg-black/10 rounded-full transition-colors ml-auto"
            >
                <X size={14} />
            </button>
        </div>
    );
}
