"use client";
import {
	faAngleLeft,
	faAngleRight,
	faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDate from "./hooks/useDate";
import { useState } from "react";
import PresentMonthDays from "./components/PresentMonthDays";
import InactiveMonthDays from "./components/InactiveMonthDays";
import CalendarView from "./components/CalendarView";

type Props = {
	togglable?: boolean;
	activity?: any[];
	dateField?: string;
};

const CalendarComponent: React.FC<Props> = ({
	togglable,
	activity,
	dateField,
}) => {
	const {
		date,
		days,
		handleNext,
		handlePrev,
		currentMonth,
		firstDayOfTheMonth,
		lastDateOfTheLastMonth,
		lastDayOfTheMonth,
	} = useDate();
	const [toggled, setToggled] = useState(false);
	let daysElements = [];

	// Add days from the previous month
	for (let i = firstDayOfTheMonth; i > 0; i--) {
		daysElements.push(
			<InactiveMonthDays
				key={`first-${i}`}
				day={lastDateOfTheLastMonth - i + 1}
			/>
		);
	}
	// Add days of the current month
	for (let i = 1; i <= days.length; i++) {
		const d = new Date(Date.UTC(date.year, date.month, i));

		const activityThatDay =
			activity && dateField
				? activity.filter((act) => {
						const dateValue = act[dateField];
						if (!dateValue) {
							// Log when dateValue is undefined or invalid
							console.log(`Invalid dateValue: ${dateValue}`);
							return false;
						}
						const actDate = new Date(dateValue);
						// Check if actDate is valid
						if (isNaN(actDate.getTime())) {
							// Log the invalid date
							console.log(`Parsed Invalid actDate: ${dateValue}`);
							return false;
						}

						return (
							actDate.getUTCDate() === d.getUTCDate() &&
							actDate.getUTCMonth() === d.getUTCMonth() &&
							actDate.getUTCFullYear() === d.getUTCFullYear()
						);
				  })
				: [];
		daysElements.push(
			<PresentMonthDays
				activity={activityThatDay}
				key={`day-${i}`}
				date={date}
				currDay={i}
				day={days[i - 1]}
			/>
		);
	}

	// Add days from the next month
	for (let i = lastDayOfTheMonth; i < 6; i++) {
		daysElements.push(
			<InactiveMonthDays
				key={`last-${i}`}
				day={i - lastDayOfTheMonth + 1}
			/>
		);
	}

	return togglable ? (
		toggled ? (
			<>
				<FontAwesomeIcon
					onClick={() => setToggled(false)}
					className="size-[20px] mb-2"
					icon={faX}
				/>
				<CalendarView
					currentMonth={currentMonth}
					currentYear={date.year}
					daysElements={daysElements}
					handleNext={handleNext}
					handlePrev={handlePrev}
				/>
			</>
		) : (
			<div
				className="dark:darkModeButton lightModeButton cursor-pointer"
				onClick={() => setToggled(true)}
			>
				Open Calendar
			</div>
		)
	) : (
		<CalendarView
			currentMonth={currentMonth}
			currentYear={date.year}
			daysElements={daysElements}
			handleNext={handleNext}
			handlePrev={handlePrev}
		/>
	);
};

export default CalendarComponent;
