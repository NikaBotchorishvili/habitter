import { createClient } from "@/utils/supabase/clients/server";
import { User } from "@supabase/supabase-js";
import { Database } from "../../../types/supabase";
import fetchWrapper from "@/utils/fetchWrapper";
import { revalidateTag } from "next/cache";

export type CompleteAndIncompleteHabits = {
	completedHabits: Database["public"]["Tables"]["habits"]["Row"][];
	incompleteHabits: Database["public"]["Tables"]["habits"]["Row"][];
};

export const getHabitsByCurrentUser = async (): Promise<CompleteAndIncompleteHabits | undefined> => {
	try {
		const response = await fetchWrapper("api/habits/manage", {
			method: "GET",
			next: { tags: ["manage-habits"] },
		});

		if(!response.ok) {
			throw new Error("Error fetching habits");
		}

		const data = await response.json();

		return data
	} catch (err) {
		console.error("Error", err);
		return undefined;
	}
};

type CompletedHabit = Database["public"]["Tables"]["completed_habits"]["Row"];

export const CompleteHabit = async (
	habitId: string
): Promise<CompletedHabit | undefined> => {
	try {
		const response = await fetchWrapper(
			`api/habits/manage/${habitId}/complete`,
			{
				method: "GET",
			}
		);
		console.log(response);
		if (!response.ok) {
			throw new Error("Error completing habit");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error", error);
		revalidateTag("manage-habits");
		return undefined;
	}
};
export const IncompleteHabit = async (
	habitId: string
): Promise<CompletedHabit | undefined> => {
	try {
		const response = await fetchWrapper(
			`api/habits/manage/${habitId}/incomplete`,
			{
				method: "GET",
			}
		);
		console.log(response);
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