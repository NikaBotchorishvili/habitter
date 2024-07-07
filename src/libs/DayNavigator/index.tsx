
import { useRouter } from "next/navigation";

type Props = {
	currentDate: Date;
};

const DayNavigator: React.FC<Props> = ({ currentDate }) => {
	const router = useRouter();
	const current = new Date(currentDate);
	const previousDay = new Date(current);
	previousDay.setDate(current.getDate() - 1);
	const nextDay = new Date(current);
	nextDay.setDate(current.getDate() + 1);

	const navigateToDay = (date: Date) => {
		const formattedDate = date.toISOString().split("T")[0];
		router.push(`/journal/${formattedDate}`);
	};

	return (
		<div className="flex justify-between items-center mb-4">
			<button onClick={() => navigateToDay(previousDay)}>
				&lt; Previous
			</button>
			<button onClick={() => navigateToDay(nextDay)}>Next &gt;</button>
		</div>
	);
};

export default DayNavigator;
