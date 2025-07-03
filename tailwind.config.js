/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'galactic': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'space': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        'cosmic': {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        'ember': {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        'quantum': {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'hologram': 'hologram 2s ease-in-out infinite',
        'quantum-shift': 'quantumShift 8s ease-in-out infinite',
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #000000 0%, #1e1b4b 25%, #000000 50%, #450a0a 75%, #000000 100%)',
        'cosmic-gradient': 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 50%, #312e81 100%)',
        'ember-gradient': 'linear-gradient(135deg, #450a0a 0%, #dc2626 50%, #7f1d1d 100%)',
        'quantum-gradient': 'linear-gradient(135deg, #022c22 0%, #10b981 50%, #064e3b 100%)',
        'holographic': 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        glow: {
          '0%': { 
            boxShadow: '0 0 5px rgba(79, 70, 229, 0.5), 0 0 10px rgba(79, 70, 229, 0.3)',
            transform: 'scale(1)'
          },
          '100%': { 
            boxShadow: '0 0 20px rgba(79, 70, 229, 0.8), 0 0 30px rgba(79, 70, 229, 0.4), 0 0 40px rgba(79, 70, 229, 0.2)',
            transform: 'scale(1.02)'
          },
        },
        hologram: {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'translateY(0px) rotateX(0deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'translateY(-2px) rotateX(1deg)'
          },
        },
        quantumShift: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%'
          },
          '50%': { 
            backgroundPosition: '100% 50%'
          },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotateY(0deg)'
          },
          '33%': { 
            transform: 'translateY(-8px) rotateY(2deg)'
          },
          '66%': { 
            transform: 'translateY(-4px) rotateY(-1deg)'
          },
        },
      },
      boxShadow: {
        'cosmic': '0 0 20px rgba(79, 70, 229, 0.3), 0 0 40px rgba(79, 70, 229, 0.1)',
        'ember': '0 0 20px rgba(220, 38, 38, 0.3), 0 0 40px rgba(220, 38, 38, 0.1)',
        'quantum': '0 0 20px rgba(16, 185, 129, 0.3), 0 0 40px rgba(16, 185, 129, 0.1)',
        'holographic': '0 0 30px rgba(255, 255, 255, 0.1), inset 0 0 30px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
};