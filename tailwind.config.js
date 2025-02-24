/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./App.{js,jsx,ts,tsx}"
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            fontFamily: {
                'poppins-thin': ['Poppins-Thin'],
                'poppins-extralight': ['Poppins-ExtraLight'],
                'poppins-light': ['Poppins-Light'],
                'poppins-regular': ['Poppins-Regular'],
                'poppins-medium': ['Poppins-Medium'],
                'poppins-semibold': ['Poppins-SemiBold'],
                'poppins-bold': ['Poppins-Bold'],
                'poppins-extrabold': ['Poppins-ExtraBold'],
                'poppins-black': ['Poppins-Black'],
            },
        },
    },
    plugins: [],
}