/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable dark mode using class strategy
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0B0C10", // Deep Midnight Blue (Background)
                secondary: "#1F2833", // Metallic Blue
                accent: "#D4AF37", // Gold
                surface: "#1F2833", // For cards
                heading: "#F5F5F5", // White/Light Grey
                text: "#C5C6C7", // Silver/Light Grey
                'deep-forest': '#2E5D33', // Deep Forest Green (Legacy)
                'brand-primary': '#2E5D33', // Deep Forest Green
                'brand-accent': '#E09F3E', // Skardu Apricot Gold
                'brand-dark': '#1A3C22', // Dark Moss
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Outfit"', 'sans-serif'],
                script: ['"Dancing Script"', 'cursive'], // Added for organic/handwritten touches if needed
            },
            backgroundImage: {
                'pattern': "url('https://www.transparenttextures.com/patterns/cream-paper.png')",
            },
            animation: {
                marquee: 'marquee 20s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'spin-slow': 'spin 3s linear infinite',
                'float': 'float 3s ease-in-out infinite',
                'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
                'slide-in': 'slideIn 0.5s ease-out forwards',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translate3d(0, 0, 0)' },
                    '100%': { transform: 'translate3d(-50%, 0, 0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shake: {
                    '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
                    '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
                    '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
                    '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
                },
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                }
            }
        },
    },
    plugins: [],
}
