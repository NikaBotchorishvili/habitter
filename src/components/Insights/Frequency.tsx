import { faHospitalUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
	frequency: string;
};
const Frequency: React.FC<Props> = ({ frequency }) => {
	return (
		<li className="flex justify-between py-3 px-8 rounded-md items-center bg-lightModeSecondary dark:bg-darkModeSecondary w-full">
			<FontAwesomeIcon
				className="size-[35px] text-lightModeBackground dark:text-darkModeBackground "
				icon={faHospitalUser}
			/>
			<span className="text-sm">Completion Frequency: {frequency}%</span>
		</li>
	);
};

export default Frequency;
