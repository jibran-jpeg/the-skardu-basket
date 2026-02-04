import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Button is now enabled on all pages including Home

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-brand-primary text-white shadow-xl border border-white/10 transition-all duration-300 transform hover:scale-110 hover:bg-brand-accent hover:text-brand-primary ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUp size={24} />
        </button>
    );
}
