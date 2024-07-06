"use client";

import { ThemeProvider as Theme } from "next-themes";
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Theme attribute="class" defaultTheme="system" enableSystem>
			{children}{" "}
		</Theme>
	);
};
