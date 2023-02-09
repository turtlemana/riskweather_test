/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      width: {
        600: '600px',
        1000: '1000px',
        '34vw': '34vw',
        '60vw': '60vw',
        '70vw': '70vw',
        '80vw': '80vw',
        '90vw': '90vw',
        1200: '1200px',
        1300: '1300px'
      },
      height: {
        90: '22rem',
        400: '400px',
        500: '500px',
        600: '600px',
        700: '700px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
        1600: '1600px',
        1800: '1800px',
        3500: '3500px',
      },
      fontSize: {
        sm: '0.8rem',
        base: '0.95rem',
        xl: '1.2rem',
        '1.5xl': '1.4rem', 
        '4xl': '2.5rem',
      },
      backgroundSize: {
        '20': '20%'
      },
      lineHeight: {
        relaxed: '1.75'
      },
      screens: {
        // sm: '480px',
        // md: '768px',
        // lg: '976px',
        // xl: '1440px',
        '3xl': '1600px'
      },
      colors: {
        'primary': '#2c5edd',
        // 'blue': '#1fb6ff',
        // 'pink': '#ff49db',
        // 'orange': '#ff7849',
        // 'green': '#13ce66',
        // 'gray-dark': '#273444',
        // 'gray': '#8492a6',
        // 'gray-light': '#d3dce6',
      },
      fontFamily: {
        // sans: ['Graphik', 'sans-serif'],
        // serif: ['Merriweather', 'serif'],
      },
      extend: {
        spacing: {
          // '128': '32rem',
          // '144': '36rem',
        },
        borderRadius: {
          // '4xl': '2rem',
        }
      }
    },
  },
  plugins: [ require("flowbite/plugin")],
}
