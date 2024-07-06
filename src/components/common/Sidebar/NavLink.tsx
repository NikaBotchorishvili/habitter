import {
	FontAwesomeIcon,
	FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
	icon: FontAwesomeIconProps["icon"];
	title: string;
	href: string;
};
const NavLink: React.FC<Props> = ({ href, icon, title }) => {
	return (
		<Link
			href={href}
			className="flex  items-center p-2 text-gray-900 rounded-lg dark:text-darkModeLight hover:bg-gray-100 dark:hover:bg-darkModeBackground group"
		>
			<FontAwesomeIcon className="size-[25px]" icon={icon} />
			<span className="flex-1 ms-3 whitespace-nowrap">{title}</span>
		</Link>
	);
};

export default NavLink;
