/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple:            '#533afd',
          'purple-hover':    '#4434d4',
          'purple-deep':     '#2e2b8c',
          'purple-light':    '#b9b9f9',
          'purple-mid':      '#665efd',
          navy:              '#061b31',
          dark:              '#1c1e54',
          'dark-navy':       '#0d253d',
          label:             '#273951',
          body:              '#64748d',
          border:            '#e5edf5',
          'border-purple':   '#b9b9f9',
          'border-soft':     '#d6d9fc',
          'border-dashed':   '#362baa',
          ruby:              '#ea2261',
          magenta:           '#f96bee',
          'magenta-light':   '#ffd7ef',
          success:           '#15be53',
          'success-text':    '#108c3d',
          lemon:             '#9b6829',
        },
      },
      fontFamily: {
        sans: [
          'sohne-var',
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'Source Code Pro',
          'SourceCodePro',
          'SFMono-Regular',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        'shadow-soft':     'rgba(23,23,23,0.06) 0px 3px 6px',
        'shadow-ambient':  'rgba(23,23,23,0.08) 0px 15px 35px 0px',
        'shadow-card':     'rgba(50,50,93,0.25) 0px 30px 45px -30px, rgba(0,0,0,0.1) 0px 18px 36px -18px',
        'shadow-deep':     'rgba(3,3,39,0.25) 0px 14px 21px -14px, rgba(0,0,0,0.1) 0px 8px 17px -8px',
        'shadow-nav':      'rgba(0,55,112,0.08) 0px -1px 0px inset',
      },
      keyframes: {
        hide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(6px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-6px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        accordionOpen: {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionClose: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        dialogOverlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        dialogContentShow: {
          from: { opacity: "0", transform: "translate(-50%, -45%) scale(0.95)" },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
        "slide-up-fade": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
        "slide-down-fade": {
          from: { opacity: "0", transform: "translateY(-26px)" },
          to: { opacity: "1", transform: "translateY(0px)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(100%)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade: "slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade: "slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade: "slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        accordionOpen: "accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)",
        accordionClose: "accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)",
        dialogOverlayShow: "dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogContentShow: "dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down-fade": "slide-down-fade ease-in-out",
        "slide-up-fade": "slide-up-fade ease-in-out",
        "slide-in-right": "slide-in-right 0.22s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
