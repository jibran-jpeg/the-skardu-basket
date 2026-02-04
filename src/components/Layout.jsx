import { useEffect } from 'react';
import { storeConfig } from '../store.config';

export function Layout({ children }) {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--color-primary', storeConfig.theme.primaryColor);
        root.style.setProperty('--color-secondary', storeConfig.theme.secondaryColor);
        root.style.setProperty('--color-bg', storeConfig.theme.backgroundColor);
        root.style.setProperty('--color-text', storeConfig.theme.textColor);
    }, []);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] font-sans text-[var(--color-text)]">
            {children}
        </div>
    );
}
