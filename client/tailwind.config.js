/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "primary": "var(--md-sys-color-primary)",
      "onprimary": "var(--md-sys-color-on-primary)",
      "primary-variant": "var(--md-sys-color-primary-container)",
      "onprimary-variant": "var(--md-sys-color-on-primary-container)",

      "secondary": "var(--md-sys-color-secondary)",
      "onsecondary": "var(--md-sys-color-on-secondary)",
      "secondary-variant": "var(--md-sys-color-secondary-container)",
      "onsecondary-variant": "var(--md-sys-color-on-secondary-container)",

      "tertiary": "var(--md-sys-color-tertiary)",
      "ontertiary": "var(--md-sys-color-on-tertiary)",
      "tertiary-variant": "var(--md-sys-color-tertiary-container)",
      "ontertiary-variant": "var(--md-sys-color-on-tertiary-container)",

      "error": "var(--md-sys-color-error)",
      "onerror": "var(--md-sys-color-on-error)",
      "error-variant": "var(--md-sys-color-error-container)",
      "onerror-variant": "var(--md-sys-color-on-error-container)",
      
      "background": "var(--md-sys-color-background)",
      "onbackground": "var(--md-sys-color-on-background)",

      "surface": "var(--md-sys-color-surface)",
      "onsurface": "var(--md-sys-color-on-surface)",
      "surface-variant": "var(--md-sys-color-surface-variant)",
      "onsurface-variant": "var(--md-sys-color-on-surface-variant)",

      "outline": "var(--md-sys-color-outline)",
    },
    fontFamily: {
      "primary": "'Anek Devanagari', sans-serif",
      "secondary":  "'Martel', serif",
    },
    extend: {},
  },
};
