import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
      sans:['inter']
    },
    fontWeight: {
      'thin': '100',
      'hairline': '100',
      'extralight': '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    screens: {
      'sm': '300px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontSize: {
      'sm': '1rem',
      'base': '2.5rem',
      'xl': '3rem',
      '2xl': '3.3rem',
      '3xl': '3.6rem',
      '4xl': '3.9rem',
      '5xl': '5rem',
    },
    colors:{
      'EngineeringOrange':'#BA1200',
      'RichBlack':'#031927',
      'BabyBlue':'#9DD1F1',
      'AirForceBlue':'#508AA8',
      'ColumbiaBlue': '#C8E0F4',
      'white':'#FFFFFF',
    },
    dropShadow:{
      'md':'4px 4px 1px rgba(0, 0, 0, 0.75)'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          'error':'#BA1200',
          'info':'#031927',
          'primary':'#9DD1F1',
          'secondary':'#508AA8',
          'accent': '#C8E0F4',
          'success':'#FFFFFF',
        },
      },
      "dark",
      "cupcake",
    ],
  },
} satisfies Config;
