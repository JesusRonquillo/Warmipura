/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WARMIPURA ONG - Paleta Artística/Cálida
        ong: {
          primary: '#FE7F30',      // Naranja - Color Principal
          secondary: '#38050E',    // Marrón Oscuro - Para Tipografías
          'detail-1': '#A72666',  // Magenta/Rojo Púrpura - Para Botones
          'detail-2': '#E53B33',  // Rojo/Coral - Para Botones
          base: '#FFE299',         // Amarillo Claro/Crema - Para Tipografías o Fondos
        },
        // WARMIPURA DIGITAL - Paleta Corporativa/Digital
        digital: {
          primary: '#202670',      // Azul Oscuro/Índigo - Color Principal
          secondary: '#FE7F30',   // Naranja - Para Tipografías
          'detail-1': '#E53B33', // Rojo/Coral - Para Botones
          'detail-2': '#3F1906', // Marrón Oscuro - Para Botones
          base: '#FFE299',        // Amarillo Claro/Crema - Para Tipografías o Fondos
        },
        // Colores compartidos
        warmipura: {
          orange: '#FE7F30',      // Naranja compartido
          red: '#E53B33',         // Rojo/Coral compartido
          cream: '#FFE299',       // Crema compartido
        },
        // Colores legacy para compatibilidad
        primary: {
          DEFAULT: '#202670',
          light: '#2a3180',
          dark: '#1a1f5a',
        },
        secondary: {
          DEFAULT: '#3F1906',
          light: '#4a1f07',
          dark: '#321407',
        },
        accent: {
          DEFAULT: '#FE7F30',
          light: '#ff8f40',
          dark: '#e66f20',
        },
        detail: {
          DEFAULT: '#E53B33',
          light: '#f04a42',
          dark: '#d12a22',
        },
        base: {
          DEFAULT: '#FFE299',
          light: '#fff2b3',
          dark: '#f5d680',
        },
      },
      fontFamily: {
        display: ['Funnel Display', 'sans-serif'],
        body: ['Helvetica Neue', 'sans-serif'],
        accent: ['Borel Regular', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} 