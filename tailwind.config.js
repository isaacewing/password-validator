/** @type {import('tailwindcss').Config} */
module.exports = {
    content:[
        './public/**/*.html',
        './src/**/*.{js,ts,jsx,tsx,mdx,vue}',
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '1600px',
                '4xl': '1920px',
                '5xl': '2048px',
                '6xl': '2560px',
                '7xl': '3440px',
                '8xl': '3840px',
                '9xl': '7680px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
};
