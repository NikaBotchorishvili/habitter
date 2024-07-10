import { faFire, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
	missedDays: number;
};
const MissedDays: React.FC<Props> = ({ missedDays }) => {
	return (
		<li className="flex justify-between py-3 px-8  rounded-md items-center bg-lightModeSecondary dark:bg-darkModeSecondary w-full">
			<FontAwesomeIcon className="size-[35px]  text-red-500 " icon={faX} />
			<span className="text-sm">Missed Days: {missedDays} days</span>
		</li>
	);
};

export default MissedDays;
