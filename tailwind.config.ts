/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      animation: {
        "slit-in-horizontal": "slit-in-horizontal 0.35s ease   both",
        "slit-out-horizontal": "slit-out-horizontal 0.3s ease   both"
      },
      keyframes: {
        "slit-in-horizontal": {
          "0%": {
            transform: "translateZ(-800px) rotateX(90deg)",
            opacity: "0"
          },
          "54%": {
            transform: "translateZ(-160px) rotateX(87deg)",
            opacity: "1"
          },
          to: {
            transform: "translateZ(0) rotateX(0)"
          }
        },
        "slit-out-horizontal": {
          "0%": {
            transform: "translateZ(0) rotateX(0)",
            opacity: "1"
          },
          "54%": {
            transform: "translateZ(-160px) rotateX(87deg)",
            opacity: "1"
          },
          to: {
            transform: "translateZ(-800px) rotateX(90deg)",
            opacity: "0"
          }
        }
      }
    }
  },
  plugins: [],
  mode: "jit"
};
