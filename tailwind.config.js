/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4a6bff',
        primaryDark: '#2a3c80',
        textLight: '#333',
        textDark: '#e4e4e4',
        bgLight: '#f8f9fa',
        bgDark: '#121212',
        cardLight: '#ffffff',
        cardDark: '#1f1f1f',
        
        // 기본 tailwind 색상도 그대로 사용 가능
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
        },
      },
      fontFamily: {
        'sans': ['var(--font-noto-sans-kr)', 'Noto Sans KR', 'sans-serif'],
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace']
      },
      spacing: {
        'header': '70px'
      },
      keyframes: {
        bounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'rotate(45deg) translateY(0)' },
          '40%': { transform: 'rotate(45deg) translateY(-10px)' },
          '60%': { transform: 'rotate(45deg) translateY(-5px)' }
        }
      },
      animation: {
        bounce: 'bounce 2s infinite'
      },
      zIndex: {
        '100': '100'
      }
    },
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1440px',
    }
  },
  plugins: [],
}