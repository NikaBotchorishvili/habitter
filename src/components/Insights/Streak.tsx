import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
	streak: number;

}
const Streak: React.FC<Props> = ({ streak }) => {
	return (
		<li className="flex justify-between py-3 px-8  rounded-md items-center bg-lightModeSecondary dark:bg-darkModeSecondary w-full">
			<FontAwesomeIcon className="size-[35px] text-lightModeBackground dark:text-darkModeBackground " icon={faFire} />
			<span className="text-sm">Current Streak: {streak} days</span>
		</li>
	);
};

export default Streak;
