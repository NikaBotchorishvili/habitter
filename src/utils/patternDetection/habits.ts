import { parseISO, eachDayOfInterval, format, isAfter } from "date-fns";
import { CompletedHabit } from "../../../types/general";

export const currentStreak = (completions: CompletedHabit[]): number => {
	const sortedCompletions = completions.sort(
		(a, b) =>
			new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
	);

	let count = 0;
	sortedCompletions.reverse().forEach((el, i) => {
		if (
			new Date().setUTCHours(0, 0, 0, 0) -
				new Date(el.created_at).setUTCHours(0, 0, 0, 0) ===
			i * 86400000
		) {
			++count;
		}
	});
	console.log(count);
	return count;
};

export const getFrequency = (
	completions: CompletedHabit[],
	startDate: string,
	endDate: string,
	habitCreationDate: string
): string => {
	const start = isAfter(parseISO(startDate), parseISO(habitCreationDate))
		? parseISO(startDate)
		: parseISO(habitCreationDate);
	const end = parseISO(endDate);

	const totalDays = eachDayOfInterval({ start, end }).length;
	const completedDays = completions.length;
	const frequency = (completedDays / totalDays) * 100;

	return frequency.toFixed(2);
};

export const getMissedDays = (
	completions: CompletedHabit[],
	startDate: string,
	endDate: string,
	habitCreationDate: string
): number => {
	const start = isAfter(parseISO(startDate), parseISO(habitCreationDate))
		? parseISO(startDate)
		: parseISO(habitCreationDate);
	const end = parseISO(endDate);

	const totalDays = eachDayOfInterval({ start, end }).length;
	const completedDays = completions.length;
	const missedDays = totalDays - completedDays;

	return missedDays;
};
