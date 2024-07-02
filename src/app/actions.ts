import { createClient } from "@/utils/supabase/clients/server";
import { UserResponse } from "@supabase/supabase-js";

export const getCurrentUser = async (): Promise<UserResponse> => {
	const supabase = await createClient();
	const data = await supabase.auth.getUser();
	return data;
};
