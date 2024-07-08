"use server";

import { createClient } from "@/utils/supabase/clients/server";
import { User } from "@supabase/supabase-js";
import { revalidateTag } from "next/cache";
import { handleReOrderParams } from "../../types/general";
import fetchWrapper from "@/utils/fetchWrapper";
import { Database } from "../../types/supabase";
type Habit = Database["public"]["Tables"]["habits"]["Row"];

export const createNewHabit = async (habit_title: string): Promise<any> => {
	try {
		const res = await fetchWrapper("/api/habits", {
			method: "POST",
			next: { tags: ["habits"] },
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				habit_title,
			},
		});

		if (!res.ok) {
			throw new Error("Failed to add habit");
		}
		const data = await res.json();
		revalidateTag("habits");
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};
export const updateHabit = async (
	habit_title: string,
	id?: string
): Promise<any> => {
	try {
		if (!id) throw new Error("Habit ID is required");
		const res = await fetchWrapper(`/api/habits/${id}`, {
			method: "PUT",
			next: { tags: ["habits"] },
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				habit_title,
			},
		});

		if (!res.ok) {
			throw new Error("Failed to add habit");
		}
		const data = await res.json();
		revalidateTag("habits");
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const getCurrentUser = async (): Promise<User | null> => {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data || data == null) throw new Error("User not found");

	return data.user;
};

export const getHabitById = async (habit_id: string) => {
	"use server";
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("habits")
		.select("*")
		.eq("id", habit_id)
		.single();

	if (error) throw error;
	return data;
};

export async function getHabitsByUser(): Promise<Habit[] | null> {
	try {
		const res = await fetchWrapper("api/habits", {
			method: "GET",
			next: { tags: ["habits"] },
		});

		if (!res.ok) {
			throw new Error("Failed to fetch habits");
		}
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export const reOrderHabits = async ({
	item_one_id,
	item_two_id,
}: handleReOrderParams) => {
	try {
		const supabase = await createClient();

		const { data: item_one, error: item_one_error } = await supabase
			.from("habits")
			.select("*")
			.eq("id", item_one_id)
			.maybeSingle();
		const { data: item_two, error: item_two_error } = await supabase
			.from("habits")
			.select("*")
			.eq("id", item_two_id)
			.maybeSingle();

		if (item_one_error || item_two_error)
			throw item_one_error || item_two_error;

		if (!item_one || !item_two) throw new Error("Item not found");

		const { error: update_one_error } = await supabase
			.from("habits")
			.update({ ordering: item_two.ordering })
			.eq("id", item_one_id);
		if (update_one_error) throw update_one_error;

		const { error: update_two_error } = await supabase
			.from("habits")
			.update({ ordering: item_one.ordering })
			.eq("id", item_two_id);

		if (update_two_error) throw update_two_error;
	} catch (error) {
		console.error("Reordering error:", error);
	}
};


export const deleteHabit = async (habit_id: string) => {
	try {
		const res = await fetchWrapper(`/api/habits/${habit_id}`, {
			method: "DELETE",
			next: { tags: ["habits"] },
		});

		if (!res.ok) {
			throw new Error("Failed to delete habit");
		}
		revalidateTag("habits");
	} catch (error) {
		console.error(error);
	}
}