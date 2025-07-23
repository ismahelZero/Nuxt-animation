/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './pages/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    fontFamily: {
      'open-sans': ['Open Sans', 'sans-serif'],
      rubik: ['Alexandria', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        lg: 'auto',
        xl: '1240px',
        '2xl': '1440px'
      }
    },
    extend: {
      colors: {
        // general
        primary: '#E4004B',
        light: '#FFFFFF',

        dark: '#0a0a0a',
        'dark-secondary': '#1a1a1a',
        accent: '#ff6b35',
        'accent-light': '#ff8a65',

        // gray shades
        'gray-light': '#F7F8FA',
        'gray-light-1': '#E8E9EA',
        'gray-medium': '#A3A3A3',
        'gray-dark': '#6F6F6F',
        'gray-dark-1': '#3B3939',
        'gray-darker': '#292929',

        // information
        danger: '#ef4444',
        'muted-danger': '#fef2f2',

        success: '#28c76f',
        'muted-success': '#d2f2e0',

        info: '#055160',
        'muted-info': '#E4F4F8',

        warning: '#FF9F43',
        'muted-warning': '#FFECD9'
      },
      screens: {
        xs: '530px'
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(255, 107, 53, 0.5)' },
          to: { boxShadow: '0 0 30px rgba(255, 107, 53, 0.8)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  safelist: [
    {
      pattern:
        /^bg-(primary|secondary|blue|red|green|yellow|purple|pink|indigo|gray)-?(50|100|200|300|400|500|600|700|800|900)?$/
    },
    {
      pattern:
        /^border-(primary|secondary|blue|red|green|yellow|purple|pink|indigo|gray)-?(50|100|200|300|400|500|600|700|800|900)?$/
    },
    {
      pattern:
        /^text-(primary|secondary|blue|red|green|yellow|purple|pink|indigo|gray)-?(50|100|200|300|400|500|600|700|800|900)?$/
    }
  ],
  plugins: [require('@tailwindcss/typography')]
}
