import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import Sidebar from "@/components/common/Sidebar";
import Providers from "@/providers/Providers";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"] });
export const metadata: Metadata = {
	title: "Habitter",
	description:
		"An all in one application which helps you with developing new habits.",
};
import { ToastContainer } from "react-toastify";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${robotoMono.className} flex bg-lightModeBackground dark:bg-darkModeBackground`}
			>
				<Providers>
					<Sidebar />
					<div className=" relative md:flex-grow w-screen">
						{children}
					</div>
					<ToastContainer />
				</Providers>
			</body>
		</html>
	);
}
