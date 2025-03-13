/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      colors: {
        primary: "primary",
        "primary-foreground": "primary-foreground",
        secondary: "secondary",
        "secondary-foreground": "secondary-foreground",
        muted: "muted",
        "muted-foreground": "muted-foreground",
        accent: "accent",
        "accent-foreground": "accent-foreground",
        card: "card",
        "card-foreground": "card-foreground",
        popover: "popover",
        "popover-foreground": "popover-foreground",
        border: "border",
        input: "input",
        destructive: "destructive",
        "destructive-foreground": "destructive-foreground",
        success: "success",
        "success-foreground": "success-foreground",
        warning: "warning",
        "warning-foreground": "warning-foreground",
        radius: "radius",
        ring: "ring",
      },
    },
  },
  plugins: [],
};
