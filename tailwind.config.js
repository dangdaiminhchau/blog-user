/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['Playfair'],
                poppins: ['Poppins'],
            },
        },
        colors: {
            white: '#FFFFFF',
            black: '#000000',
            primary: '#097BED',
            button1: '#0079FF',
            button2: '#FF5253',
            text1: '#666666',
            gray1: '#283F62',
            blue1: '#0079FF',
            blue2: '#E6F2FD',
            blue3: '#6B7280',
            green1: '#0ED3CF',
            green2: 'rgba(14,211,207,.7)',
            yellow1: '#FFBE00',
            black1: '#1F2937',
            gray2: '#9CA3AF',
            gray3: '#6B7280',
            gray4: '#F3F4F6',
            gray5: '#1F2937',
        },
    },
    plugins: [],
};
