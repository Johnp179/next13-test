/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        "fluid-s": "clamp(0.7rem, 1vw, 1rem)",
        "fluid-m": "clamp(1rem, 1.5vw, 1.4rem)",
        "fluid-l": "clamp(1.5rem, 3vw, 2.7rem)",
      },
    },
  },
  plugins: [],
};
