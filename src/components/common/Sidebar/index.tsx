import {
	faBook,
	faBookAtlas,
	faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faDoorClosed } from "@fortawesome/free-solid-svg-icons/faDoorClosed";
import NavLink from "./NavLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutButton from "./Logout/main";

const Sidebar = () => {
	const handleLogout = async () => {
		try {
			const res = await fetch("/api/auth/logout");
			if (!res.ok) {
				throw new Error("Failed to logout");
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<aside
			className="fixed top-0  left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
			aria-label="Sidebar"
		>
			<div className="flex h-full  px-3 py-4  overflow-y-auto bg-gray-50 dark:bg-darkModeMain">
				<nav className="flex flex-col justify-between w-full h-[80%] my-auto  font-medium">
					<div>
						<Image
							alt="logo"
							src="/Habitter.svg"
							width={100}
							height={100}
						/>
					</div>
					<div className="ml-5 space-y-8">
						<NavLink
							href="/"
							title={"Dashboard"}
							icon={faDashboard}
						/>

						<NavLink
							href="#"
							title={"Manage Habits"}
							icon={faBook}
						/>
						<NavLink
							href="#"
							title={"Journal"}
							icon={faBookAtlas}
						/>
					</div>
					<LogoutButton />
					
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
