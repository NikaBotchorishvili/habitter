"use client";

import {
	JournalContext,
	JournalProvider,
} from "@/components/ManageHabits/context/JournalContext";
import { ThemeProvider } from "next-themes";
const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<JournalProvider>{children}</JournalProvider>
		</ThemeProvider>
	);
};

export default Providers;
