"use client";
import { faAngleLeft, faAngleRight, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDate from "./useDate";
import { useState } from "react";

const Calendar = () => {
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
			<div
				key={`first-${i}`}
				className="col-span-1 dark:bg-darkModeSecondary opacity-60 p-1 box-content rounded shadow text-center cursor-pointer"
			>
				{lastDateOfTheLastMonth - i + 1}
			</div>
		);
	}

	// Add days of the current month
	for (let i = 1; i <= days.length; i++) {
		daysElements.push(
			<div
				key={`day-${i}`}
				className={`col-span-1 dark:bg-darkModeSecondary p-1 box-content rounded shadow text-center cursor-pointer ${
					new Date().getDate() === i - 1 &&
					new Date().getMonth() === date.month &&
					new Date().getFullYear() === date.year &&
					"dark:bg-blue-500 text-white"
				}`}
			>
				{days[i - 1]}
			</div>
		);
	}

	// Add days from the next month
	for (let i = lastDayOfTheMonth; i < 6; i++) {
		daysElements.push(
			<div
				key={`last-${i}`}
				className="col-span-1 dark:bg-darkModeSecondary opacity-60 p-1 box-content rounded shadow text-center cursor-pointer"
			>
				{i - lastDayOfTheMonth + 1}
			</div>
		);
	}

	return toggled ? (
		<>
		<FontAwesomeIcon onClick={() => setToggled(false)} className="size-[20px] mb-2" icon={faX}/>
			<section className="mx-auto p-4 max-w-md w-full dark:bg-darkModeMain ">
				<div className="p-2 space-y-4">
					<article className="flex justify-between items-center">
						<small className=" text-2xl">
							{currentMonth} {date.year}
						</small>
						<nav className="flex space-x-8">
							<FontAwesomeIcon
								className="cursor-pointer size-[18px] rounded-full dark:hover:bg-darkModeSecondary p-2 transition-colors duration-150"
								title="Previous month"
								icon={faAngleLeft}
								onClick={handlePrev}
							/>
							<FontAwesomeIcon
								className="cursor-pointer size-[18px] rounded-full dark:hover:bg-darkModeSecondary p-2 transition-colors duration-150"
								title="Next month"
								icon={faAngleRight}
								onClick={handleNext}
							/>
						</nav>
					</article>

					<div className="grid items-center grid-cols-7 gap-4 w-full box-content">
						{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
							(day) => (
								<div
									key={day}
									className="col-span-1 dark:bg-darkModeSecondary p-1 box-content rounded shadow text-center"
								>
									{day}
								</div>
							)
						)}
						{daysElements}
					</div>
				</div>
			</section>
		</>
	) : (
		<div
			className="dark:darkModeButton"
			onClick={() => setToggled(true)}
		>
			Open Calendar
		</div>
	);
};

export default Calendar;
