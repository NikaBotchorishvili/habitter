import { DateType } from "../types";
import React from "react";

type Props = {
	currDay: number;
	day: number;
	date: DateType;
	activity: Date[];
};

const PresentMonthDays: React.FC<Props> = ({
	currDay,
	date,
	day,
	activity,
}) => {
	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	const isCurrentDate =
		currentDay === currDay &&
		currentMonth === date.month &&
		currentYear === date.year;
	const hasActivity = activity.length > 0;
	const styling = hasActivity
		? "bg-red-800 dark:bg-red-800 text-white"
		: "";
	return (
		<div
			className={`col-span-1 bg-lightModeSecondary dark:bg-darkModeSecondary  p-1 box-content rounded shadow text-center cursor-pointer ${
				isCurrentDate ? "bg-green-500 dark:bg-green-500 text-white" : styling
			}`}
		>
			{day}
		</div>
	);
};

export default PresentMonthDays;
