"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faDoorClosed } from "@fortawesome/free-solid-svg-icons";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter()
	const handleLogout = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/auth/logout/", {
                method: "POST",
                credentials: "include", // Include cookies if needed
            });
            if (response.ok) {
                // Redirect to the login page or home page
                router.refresh();
              } else {
                console.error("Failed to logout");
              }

        }catch(err){
            console.error(err)
        }
	};
	return (
		<form
			onSubmit={(e) =>handleLogout(e)}
			className="flex items-center p-2 text-gray-900 rounded-lg dark:text-darkModeLight hover:bg-gray-100 dark:hover:bg-darkModeBackground group"
		>
			<button type="submit" className="flex">
				<FontAwesomeIcon className="size-[25px]" icon={faDoorClosed} />
				<span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
			</button>
		</form>
	);
};

export default LogoutButton;
