/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6392",
          700: "#FF99B8",
          500: "#FFCADA",
          300: "#FFE7EE",
          100: "#FFF1F5",
          text: "#E55883",
        },
        secondary: {
          DEFAULT: "#4FB2FF",
          700: "#A4D7FF",
          500: "#A9D9FF",
          300: "#DBEFFF",
          text: "459EE4",
        },
        gray: {
          900: "#333333",
          800: "#4D4D4D",
          700: "#666666",
          600: "#808080",
          500: "#999999",
          400: "#B3B3B3",
          300: "#CCCCCC",
          200: "#E6E6E6",
          100: "#F2F2F2",
        },
        meetingroom: "#7A5A8A",
        yellow: "#FFE45E",
        red: "#C53737",
        green: "#169C47",
        "page-background": "#F9F9F9",
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
        Jua: ["Jua", "sans-serif"],
      },
      fontSize: {
        h1: "3rem",
        h2: "2.25rem",
        h3: "1.875rem",
        h4: "1.5rem",
        h5: "1.25rem",
        h6: "1.125rem",
        large: "1.125rem",
        medium: "1rem",
        small: "0.875rem",
      },
      backgroundImage: {
        "board-gradient":
          "linear-gradient(to top, #ffffff 60%, #fcebf0 78%, #ffe7ee 100%)",
        "horizontal-gradient":
          "linear-gradient(90deg, #FFFFFF 0%, #FFFBFB 30%, #FFF1F5 70%)",
        "vertical-gradient":
          "linear-gradient(180deg, #FFF 0%, #FCEBF0 30%, #FFE7EE 100%)",
        "vivid-gradient":
          "linear-gradient(160deg, #FFE45E -50%, #FF6392 50%, #FFE45E 150%)",
        "landing-gradient":
          "linear-gradient(90deg, rgba(255, 241, 245, 0.80) 0%, rgba(241, 249, 255, 0.80) 100%)",
        "waiting-gradient":
          "linear-gradient(90deg, #5C4369 0%, #7A5A8A 22%, #7A5A8A 78%, #5C4369 100%)",
      },
      boxShadow: {
        "nav-shadow": "0px 1px 5px 0px rgba(0, 0, 0, 0.10)",
        "side-shadow": "1px 0px 5px 0px rgba(0, 0, 0, 0.10)",
        "mypage-shadow": "0px 2px 10px 0px rgba(0, 0, 0, 0.10)",
        "ticket-shadow":
          "inset 0px -5px 0.5px rgba(0, 0, 0, 0.25), 0px 8px 10px 0px rgba(0, 0, 0, 0.2)",
        "ticket-shadow-left":
          "inset 0px -5px 0.5px rgba(0, 0, 0, 0.25), 0px 8px 10px 0px rgba(0, 0, 0, 0.2)",
        "inner-shadow":
          "inset -10px -10px 20px rgba(0, 0, 0, 0.15), inset 10px 10px 20px rgba(0, 0, 0, 0.15)",
        "pink-shadow":
          "0px 2px 8px 0px rgba(255, 99, 146, 0.30), 0px -1px 1px 0px #FF6392 inset",
        "table-shadow": "0 0 0 1px #B9B9B9",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-out": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(-100%)" },
        },
        scroll: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.5s forwards",
        "slide-out": "slide-out 0.5s forwards",
        scroll: "scroll 60s linear infinite",
      },
      minHeight: {
        "screen-with-footer": "calc(100vh + 144px)",
      },
    },
  },
  plugins: ["tailwind-scrollbar-hide"],
};
