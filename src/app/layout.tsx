import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/common/Sidebar";
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400"] });
export const metadata: Metadata = {
	title: "Habitter",
	description:
		"An all in one application which helps you with developing new habits.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${robotoMono.className} flex`}>
				<Sidebar />
				<div className="ml-64 relative flex-grow w-screen">
					{children}
				</div>
			</body>
		</html>
	);
}
