// /app/api/habits/completions/route.ts

import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	try {
		const supabase = await createClient();
		const {
			data: { user },
			error: userError,
		} = await supabase.auth.getUser();

		if (userError) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}

		if (!user) {
			return NextResponse.json(
				{ error: "User not authenticated" },
				{ status: 401 }
			);
		}
		const { data, error } = await supabase
			.from("completed_habits")
			.select(
				`
        id,
        created_at,
        habit_id,
        habits (id, title, user_id)
      `
			)
			.eq("habits.user_id", user.id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		const formattedData = data.map((habit) => ({
			id: habit.id,
			created_at: habit.created_at,
			habit_id: habit.habit_id,
			title: habit.habits?.title,
		}));

		return NextResponse.json(formattedData, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: e }, { status: 500 });
	}
};
