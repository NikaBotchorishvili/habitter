"use client"
import {
	faBook,
	faBookAtlas,
	faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import NavLink from "./NavLink";
import LogoutButton from "./Logout/main";
import ThemeToggle from "./ThemeToggle";

const Sidebar = () => {
	return (
		<aside
			className="fixed top-0  left-0 z-40 w-64 h-screen transition-transform shadow-2xl -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div className="flex h-full  px-3 py-4  overflow-y-auto bg-lightModeSecondary   dark:bg-darkModeSecondary">
				<nav className="flex flex-col justify-between w-full h-[80%] my-auto  font-medium">
					<div className="dark:text-white text-darkModeBackground text-3xl font-extrabold tracking-wider">
						Habitter
					</div>
					<div className="ml-5 space-y-8 ">
						<NavLink
							href="/"
							title={"Dashboard"}
							icon={faDashboard}
						/>

						<NavLink
							href="/manage"
							title={"Manage Habits"}
							icon={faBook}
						/>
						<NavLink
							href="/journal"
							title={"Journal"}
							icon={faBookAtlas}
						/>
					<ThemeToggle />
					</div>
					<LogoutButton />
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
