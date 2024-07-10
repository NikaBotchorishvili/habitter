"use server"

import { Database } from "../../../types/supabase";
import fetchWrapper from "@/utils/fetchWrapper";
import { revalidateTag } from "next/cache";

type CompletedHabit = Database["public"]["Tables"]["completed_habits"]["Row"];
export type Habit = Database["public"]["Tables"]["habits"]["Row"];
export type CompleteAndIncompleteHabits = {
	completedHabits: Database["public"]["Tables"]["completed_habits"]["Row"][];
	incompleteHabits: Database["public"]["Tables"]["habits"]["Row"][];
};

export const getHabitsByCurrentUser = async (): Promise<
	CompleteAndIncompleteHabits | undefined
> => {
	try {
		const response = await fetchWrapper("api/habits/manage", {
			method: "GET",
			next: { tags: ["manage-habits"] },
		});

		if (!response.ok) {
			throw new Error("Error fetching habits");
		}

		const data = await response.json();

		return data;
	} catch (err) {
		console.error("Error", err);
		return undefined;
	}
};

export const CompleteHabit = async (
	habitId: string
): Promise<CompletedHabit | undefined> => {
	try {
		const response = await fetchWrapper(
			`api/habits/manage/complete/${habitId}`,
			{
				method: "GET",
			}
		);
		if (!response.ok) {
			throw new Error("Error completing habit");
		}
		const data = await response.json();
		revalidateTag("manage-habits");
		return data;
	} catch (error) {
		console.error("Error", error);
		return undefined;
	}
};
export const IncompleteHabit = async (
	habitId: string
): Promise<CompletedHabit | undefined> => {
	try {
		const response = await fetchWrapper(
			`api/habits/manage/incomplete/${habitId}`,
			{
				method: "GET",
			}
		);
		if (!response.ok) {
			throw new Error("Error completing habit");
		}

		const data = await response.json();
		revalidateTag("manage-habits");
		revalidateTag("completed-habits");

		return data;
	} catch (error) {
		console.error("Error", error);
		return undefined;
	}
};
export const UserActivity = async (): Promise<{data: Habit[]} | undefined> => {
	try {
		const response = await fetchWrapper(`api/habits/manage/complete`, {
			method: "GET",
		});
		if (!response.ok) {
			throw new Error("Error completing habit");
		}

		const data = await response.json();
		revalidateTag("manage-habits");
		revalidateTag("completed-habits");
		return data;
	} catch (error) {
		console.error("Error", error);
		return undefined;
	}
};
