module.exports = {
    content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./pages/**/*.{js,jsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                retro: ['"Press Start 2P"', 'ui-monospace', 'SFMono-Regular', 'monospace']
            },
            keyframes: {
                flicker: {
                    '0%, 100%': { opacity: '0.98' },
                    '50%': { opacity: '0.92' }
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100%)' }
                }
            },
            animation: {
                flicker: 'flicker 3s ease-in-out infinite',
                scan: 'scan 6s linear infinite'
            }
        }
    },
plugins: [require('@tailwindcss/typography'), require('daisyui')],
daisyui: {
    themes: [
        {
            retrodark: {
                "primary": "#00d1b2",
                "secondary": "#ffcc00",
                "accent": "#9a7bff",
                "neutral": "#0f1724",
                "base-100": "#071018",
                "info": "#93c5fd",
                "success": "#10b981",
                "warning": "#f59e0b",
                "error": "#ef4444"
            }
        }
    ]
}
}