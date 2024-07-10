import fetchWrapper from "@/utils/fetchWrapper";
import { CompleteAndIncompleteHabits, Habit } from "../manage/actions";
import { CompletedHabit } from "../../../types/general";


export const getCompletedHabitsById = async (habit_id: string): Promise<CompletedHabit[] | undefined> => {
	try {
		const res = await fetchWrapper(`/api/habits/completions/${habit_id}`, {
			method: "GET",
			next: { tags: ["completed-habits"] },
		});

		if (!res.ok) {
			throw new Error("Failed to fetch completedHabits");
		}

		const data = await res.json()
		return data;
	} catch (error) {
		console.error(error);
	}
}