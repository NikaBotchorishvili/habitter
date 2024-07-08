"use client";
import {
    faBook,
    faBookAtlas,
    faBars,
    faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";
import LogoutButton from "./Logout/main";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from 'clsx';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Toggle Button for Small Screens */}
            <button
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 rounded-md md:hidden"
            >
                <FontAwesomeIcon icon={faBars} className="text-[25px] text-lightModePrimary dark:text-darkModePrimary" />
            </button>

            {/* Sidebar */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 z-40 w-64 h-screen shadow-2xl bg-lightModeSecondary dark:bg-darkModeSecondary transform transition-transform",
                    {
                        '-translate-x-full': !isOpen,
                        'translate-x-0': isOpen,
                        'md:translate-x-0 md:relative md:fixed': true,
                    }
                )}
                aria-label="Sidebar"
            >
                <div className="flex h-full px-3 py-4 overflow-y-auto bg-lightModeSecondary dark:bg-darkModeSecondary">
                    <nav className="flex flex-col justify-between w-full h-[80%] my-auto font-medium">
                        <div className="dark:text-white text-darkModeBackground text-3xl font-extrabold tracking-wider">
                            Habitter
                        </div>
                        <div className="ml-5 space-y-8">
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
        </>
    );
};

export default Sidebar;
