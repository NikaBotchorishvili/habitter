"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Month } from "../types";
import {
	faAngleLeft,
	faAngleRight,
	faX,
} from "@fortawesome/free-solid-svg-icons";
type Props = {
	daysElements: React.JSX.Element[];
	currentMonth: Month;
	currentYear: number;
	handlePrev: () => void;
	handleNext: () => void;
};

const CalendarView: React.FC<Props> = ({
	daysElements,
	currentMonth,
	currentYear,
	handlePrev,
	handleNext,
}) => {
	return (
		<section className="mx-auto p-4 max-w-md w-full dark:bg-darkModeMain ">
			<div className="p-2 space-y-4">
				<article className="flex justify-between items-center">
					<small className=" text-2xl">
						{currentMonth} {currentYear}
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
	);
};

export default CalendarView;
