/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'active-campain-gradient':
          'linear-gradient(90deg, rgba(30, 15, 58, 0.34) 0%, rgba(186, 27, 167, 0.34) 64.5%, rgba(213, 86, 99, 0.34) 100%)',
        'upcoming-campain-gradient':
          'linear-gradient(90deg, rgba(30, 15, 58, 0.34) 0%, rgba(86, 114, 241, 0.34) 64.5%, rgba(8, 153, 255, 0.34) 100%);',
        'past-campain-gradient':
          'linear-gradient(90deg, rgba(37, 17, 52, 0.34) 0%, rgba(203, 186, 35, 0.34) 64.5%, rgba(250, 255, 8, 0.34) 100%);',
        'button-gradient': 'linear-gradient(96deg, #8B2D9C 4.79%, #E6464E 54.08%, #FB6824 88.26%, #F2A901 132.29%)',
        'timer-gradient': 'linear-gradient(90deg, rgba(14, 3, 33, 0.00) 0.01%, rgba(14, 3, 33, 0.34) 82.65%)',
      },
      backgroundColor: {
        app: '#1d1d1d',
      },
      colors: {
        'content-primary': 'var(--Content-Primary)',
        'nuetral':"#272727",
        'hovered-nuetral':'#303030',
        'content-secondary': 'var(--Content-Secondary)',
        'error': 'var(--error)',
        'content-tirtiary': 'var(--Content-Tertiary)',
        'btn-primary': 'var(--Content-Button-link-primary)',
        'btn-link-secondary': 'var(--Content-Button-link-secondary)',
        gold: 'var(--brand-old-gold)',
        'border-primary': 'var(--Border-Primary)',
        'border-secondary': 'var(--Border-Secondary)',

        muted: '#8F8F8F',
        success: '#65CC7C',
        // background: 'var(--app-bg)',
        skin: {
          primary: 'var(--color-primary)',
          'primary-hover': 'var(--color-primary-hover)',
          base: 'var(--color-text-base)',
          muted: 'var(--color-text-muted)',
          inverted: 'var(--color-text-inverted)',
          'border-primary': 'var(--border-color)',
          'info-text-color': 'var(--info-text)',
          'info-bg-color': 'var(--info-bg)',

          'success-text-color': 'var(--success-text)',
          'success-bg-color': 'var(--success-bg)',

          'warning-text-color': 'var(--warning-text)',
          'warning-bg-color': 'var(--warning-bg)',

          'error-text-color': 'var(--error-text)',
          'error-bg-color': 'var(--error-bg)',
        },
      },
      fontFamily: {
        press: ['Press Start 2P', 'system-ui'],
        poppins: ['Poppins', 'sans-serif'],
        itc: ['ITC', 'system-ui'],
        'itc-thin': ['ITC-thin', 'system-ui'],
        'itc-mid': ['ITC-mid', 'system-ui'],
      },
      // MEDIA QUERIES
      screens: {
        // min-width: 360px
        '2xs': '360px',
        xs: '500px',
        sm: '640px',
        md: '834px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        // max-width: 360px
        'max-2xs': { max: '360px' },
        'max-xs': { max: '575px' },
        'max-sm': { max: '640px' },
        'max-md': { max: '834px' },
        'max-lg': { max: '1024px' },
        'max-xl': { max: '1280px' },
        'max-2xl': { max: '1536px' },
      },
      // KEYFRAMES
      keyframes: {
        fadeInScaleUp: {
          from: { opacity: 0, transform: ' scale(0.7)' },
          to: { opacity: 1, transform: ' scale(1)' },
        },
        fadeOutScaleDown: {
          from: { opacity: 1, transform: ' scale(1)' },
          to: { opacity: 0, transform: ' scale(0.7)' },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 0.85 } },
        fadeOut: { from: { opacity: 0.85 }, to: { opacity: 0 } },
        grow: { from: { height: 0 }, to: { height: 350 } },
      },
      // ANIMATIONS
      animation: {
        fadeIn: 'fadeIn 170ms ease-in-out',
        fadeOut: 'fadeOut 170ms ease-in-out',
        fadeInScaleUp: 'fadeInScaleUp 170ms ease-in-out',
        fadeOutScaleDown: 'fadeOutScaleDown 170ms ease-in-out',
        grow: 'grow 170ms ease-in-out',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['skin'],
      textColor: ['skin'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [],
  },
};
