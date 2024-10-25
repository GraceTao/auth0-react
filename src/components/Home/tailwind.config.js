/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    800: '#112240',
                    900: '#0a192f',
                    950: '#060d1b',
                },
            },
        },
    },
    plugins: [],
}