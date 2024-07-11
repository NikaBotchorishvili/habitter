"use client";
import React, { useEffect, useState } from "react";
import {
	currentStreak,
	getFrequency,
	getMissedDays,
} from "@/utils/patternDetection/habits";

import { CompletedHabit } from "../../../types/general";
import Streak from "./Streak";
import Frequency from "./Frequency";
import MissedDays from "./MissedDays";
import { Habit } from "@/app/manage/actions";
interface Props {
	completions: CompletedHabit[];
	startDate: string;
	endDate: string;
	habit: Habit;
}

const Insights: React.FC<Props> = ({ completions, startDate, endDate, habit }) => {
	const [habitCompletions, setHabitCompletions] = useState<CompletedHabit[]>(
		[]
	);
	const [currentStreakValue, setCurrentStreakValue] = useState<number>(0);
	const [frequency, setFrequency] = useState<string>("0");
	const [missedDays, setMissedDays] = useState<number>(0);

	useEffect(() => {
		setHabitCompletions(completions);
	}, [completions]);

	useEffect(() => {
		if (habitCompletions.length > 0) {
			setCurrentStreakValue(currentStreak(habitCompletions));
			setFrequency(getFrequency(habitCompletions, startDate, endDate, habit.created_at));
			setMissedDays(getMissedDays(habitCompletions, startDate, endDate, habit.created_at));
		}
	}, [habitCompletions, startDate, endDate, habit.created_at]);
	return (
		<div className="flex flex-col items-center mt-10">
				<ul className="flex justify-center flex-wrap gap-5 md:max-w-[400px] max-w-[250px] w-full ">
				<Streak streak={currentStreakValue} />
				<Frequency frequency={frequency} />
				<MissedDays missedDays={missedDays} />
			</ul>
		</div>
	);
};

export default Insights;
