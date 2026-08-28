/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: { DEFAULT: 'var(--background)', secondary: 'var(--background-secondary)' },
        foreground: { DEFAULT: 'var(--foreground)' },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          dark: 'var(--primary-dark)',
          glow: 'var(--primary-glow)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          blue: 'var(--accent-blue)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: { DEFAULT: 'var(--border)', bright: 'var(--border-bright)' },
        input: { DEFAULT: 'var(--input)' },
        ring: { DEFAULT: 'var(--ring)' },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        success: { DEFAULT: 'var(--success)' },
        warning: { DEFAULT: 'var(--warning)' },
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-green': 'linear-gradient(135deg, #00c805 0%, #00a804 100%)',
        'gradient-ai': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #00c805 100%)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(0, 200, 5, 0.2)',
        'glow-md': '0 0 24px rgba(0, 200, 5, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 200, 5, 0.4)',
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'card-elevated': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'fade-in-scale': 'fadeInScale 0.4s ease forwards',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'float': 'floatAnim 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'scan': 'scanLine 4s linear infinite',
        'grid-pulse': 'gridPulse 4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};