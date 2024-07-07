"use client";
import React, { useState } from "react";
import Years from "./Years";
import Months from "./Months";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Days from "./Days";
import { getDayWithSuffix } from "@/utils/dateutils/getDaySuffix";

type Props = {
	defaultDate?: Date;
	onClose: () => void;
	urlPrefix: string;
};

const DatePicker: React.FC<Props> = ({ defaultDate, onClose, urlPrefix }) => {
	const router = useRouter();
	const presentDate = new Date();
	const presentYear = presentDate.getFullYear();

	const [selectedYear, setSelectedYear] = useState<number>(
		defaultDate?.getFullYear() || presentYear
	);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(
		defaultDate?.getMonth() || null
	);
	const [selectedDay, setSelectedDay] = useState<number | null>(
		defaultDate?.getDate() || null
	);

	const [alreadySelectedYear, setAlreadySelectedYear] =
		useState<boolean>(false);
	const [alreadySelectedMonth, setAlreadySelectedMonth] =
		useState<boolean>(false);
	const handleYearClick = (year: number) => {
		setAlreadySelectedYear(true);
		setSelectedYear(year);
	};

	const handleMonthClick = (monthIndex: number) => {
		setSelectedMonth(monthIndex);
		setAlreadySelectedMonth(true);
	};
	const getMonthName = (monthIndex: number) => {
		const date = new Date();
		date.setMonth(monthIndex);
		return date.toLocaleString("default", { month: "short" });
	};

	const handleDayClick = (day: number) => {
		setSelectedDay(day);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex absolute flex-col gap-y-3 bg-lightModeSecondary dark:bg-darkModeSecondary rounded-md box-content p-4 w-[280px]"
		>
			<small className="dark:text-darkModePrimary text-lightModePrimary text-2xl font-bold">
				{!selectedYear && !selectedMonth && !selectedDay
					? "_ _"
					: `${selectedYear} ${
							selectedMonth !== null
								? getMonthName(selectedMonth)
								: ""
					  } ${selectedDay !== null ? getDayWithSuffix(selectedDay) : ""}`}
			</small>
			{selectedYear === null || alreadySelectedYear === false ? (
				<Years
					handleYearClick={handleYearClick}
					presentYear={presentYear}
					selectedYear={selectedYear}
				/>
			) : !alreadySelectedMonth ? (
				<Months
					handleMonthClick={handleMonthClick}
					selectedMonth={selectedMonth}
				/>
			) : (
				<Days
					selectedYear={selectedYear}
					selectedMonth={selectedMonth}
					selectedDay={selectedDay}
					handleDayClick={handleDayClick}
				/>
			)}
			<nav className="flex justify-between mt-4">
				<button
					className="dark:darkModeButtonV2 lightModeButtonV2"
					onClick={onClose}
				>
					Cancel
				</button>
				<Link
					href={`${urlPrefix}/${new Date(
						selectedYear,
						selectedMonth || 0,
						selectedDay || 1
					).toISOString()}`}
					className="dark:darkModeButtonV2 lightModeButtonV2"
				>
					Submit
				</Link>
			</nav>
		</motion.div>
	);
};

export default DatePicker;
