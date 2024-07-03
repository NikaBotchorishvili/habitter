import { DateType } from "../types";

type Props = {
    currDay: number;
    day: number;
    date: DateType;
    
}

const PresentMonthDays: React.FC<Props> = ({currDay, date, day}) => {
    return (
			<div
				className={`col-span-1 dark:bg-darkModeSecondary p-1 box-content rounded shadow text-center cursor-pointer ${
					new Date().getDate() === currDay - 1 &&
					new Date().getMonth() === date.month &&
					new Date().getFullYear() === date.year &&
					"dark:bg-blue-500 text-white"
				}`}
			>
				{day}
			</div>
    );
}
 
export default PresentMonthDays;