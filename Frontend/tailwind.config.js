/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-pink': '#FF9BD2',
                'primary-blue': '#A3D9FF',
                'primary-purple': '#D0BFFF',
                'primary-mint': '#99F6E4',
                'glass-bg': 'rgba(255, 255, 255, 0.12)',
                'glass-border': 'rgba(255, 255, 255, 0.2)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
                accent: ['Comic Neue', 'cursive'],
            },
            backgroundImage: {
                'gradient-rainbow': 'linear-gradient(135deg, #FF9BD2 0%, #FFC8DD 25%, #A3D9FF 50%, #D0BFFF 75%, #99F6E4 100%)',
            },
            borderRadius: {
                '3xl': '24px',
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
            }
        },
    },
    plugins: [],
}

