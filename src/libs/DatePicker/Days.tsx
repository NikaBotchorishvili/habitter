// /app/journal/components/Days.tsx
import React from "react";

type Props = {
	selectedYear: number | null;
	selectedMonth: number | null;
	selectedDay: number | null;
	handleDayClick: (day: number) => void;
};

const Days: React.FC<Props> = ({
	selectedYear,
	selectedMonth,
	selectedDay,
	handleDayClick,
}) => {
	const daysInMonth = new Date(selectedYear!, selectedMonth! + 1, 0).getDate();

	return (
		<section className="grid grid-cols-7 gap-y-3 h-[250px] overflow-y-scroll">
			{Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
				<div
					className={`text-lg cursor-pointer ${
						day === selectedDay ? "font-bold text-blue-500" : ""
					}`}
					key={day}
					onClick={() => handleDayClick(day)}
				>
					<h2>{day}</h2>
				</div>
			))}
		</section>
	);
};

export default Days;
