import type { Config } from "tailwindcss";
// const colors = require("tailwindcss/colors");

import colors from "tailwindcss/colors"
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libs/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
		fontFamily: {
			Roboto: "Roboto, sans-serif",
		},
		extend: {
			colors: {
				RichBlack: "#0D1B2A",
				darkModeMain: "#1B263B",
				darkModeSecondary: "#415A77",
				darkModeWhite: "#E0E1DD"

			}
		},
	},
  plugins: [],
};
export default config;
