import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check localStorage for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme === 'dark';
        }
        // Fallback to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Update localStorage and html class when theme changes
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            // Only update if user hasn't manually set a preference? 
            // Or if we want to follow system when no manual preference is set.
            // For now, let's just respect the change if no rigid override logic prevents it.
            // But our 'isDarkMode' state is the source of truth.
            // If we want to strictly follow system if no local storage, we need to check local storage existence inside the listener?
            // A simpler approach: update state if the user hasn't explicitly set a preference *recently*?
            // Actually, if a user uses the toggle, 'theme' is set in localStorage.
            // So if 'theme' is in localStorage, we ignore system changes?
            if (!localStorage.getItem('theme')) {
                setIsDarkMode(e.matches);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
