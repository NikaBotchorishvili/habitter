import { createClient } from "@/utils/supabase/clients/server";
import { UserResponse } from "@supabase/supabase-js";

export const getCurrentUser = async (): Promise<UserResponse> => {
	const supabase = await createClient();
	const data = await supabase.auth.getUser();
	return data;
};

export const getHabitById = async (habit_id: string) => {
	const supabase = await createClient();
	const { data, error } = await supabase
		.from("habits")
		.select("*")
		.eq("id", habit_id)
		.single();

	if (error) throw error;
	return data;
}