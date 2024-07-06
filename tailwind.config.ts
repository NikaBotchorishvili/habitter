import type { Config } from "tailwindcss";
// const colors = require("tailwindcss/colors");

import colors from "tailwindcss/colors";
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
				darkModeBackground: "#1B263B",
				darkModeSecondary: "#415A77",
				darkModeLight: "#E0E1DD",
				darkModePrimary: "#FFD60A", // Need to change this and use
				lightModeBackground: "#90E0EF",
				lightModeSecondary: "#0077B6",
				lightModeLight: "#E0E1DD",
				lightModePrimary: "#03045E", // Need to change this and use
			},
		},
	},
	darkMode: "class",
	plugins: [],
};
export default config;
