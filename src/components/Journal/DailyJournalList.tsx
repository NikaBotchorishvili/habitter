"use client";
import { DateTime } from "../common/ui/DateTime";
import DatePicker from "@/libs/DatePicker";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import MonthYear from "../common/ui/MonthYear";
import DayNavigator from "@/libs/DayNavigator";
import { JournalEntry } from "@/app/journal/actions";

type Props = {
    entries: JournalEntry[]
}

export const DailyJournalList: React.FC<Props> = ({ entries }) => {
    const [datePickerToggled, setDatePickerToggled] = useState(false);
    
	const params = useParams<{ date: string }>();
    
	const date = params.date ? decodeURIComponent(params.date) : undefined;
	return (
		<section className="relative w-full">
            <DayNavigator currentDate={date? new Date(date): new Date()} />
			<h2 className="text-2xl mb-5">
				Journal entries of{" "}
				{date === undefined ? (
					"Today"
				) : (
					<MonthYear date={new Date(date)} />
				)}
			</h2>
			<AnimatePresence>
				{datePickerToggled ? (
					<DatePicker
						urlPrefix="/journal"
						onClose={() => setDatePickerToggled(false)}
					/>
				) : (
					<button
						className="dark:darkModeButton lightModeButton flex gap-x-4 items-center"
						onClick={() => setDatePickerToggled(true)}
					>
						<span>Filter</span>
						<FontAwesomeIcon icon={faCalendar} />
					</button>
				)}
			</AnimatePresence>

			{entries.length > 0 ? (
				entries.map((entry) => (
					<article
						key={entry.id}
						className="flex flex-col gap-y-3 mt-8 w-full"
					>
						<DateTime date={new Date(entry.entry_datetime)} />
						<div className="w-full">
							<p className="w-full bg-lightModeSecondary dark:bg-darkModeSecondary p-5 rounded-md">
								{entry.content}
							</p>
						</div>
					</article>
				))
			) : (
				<p>No entries found</p>
			)}
		</section>
	);
};
