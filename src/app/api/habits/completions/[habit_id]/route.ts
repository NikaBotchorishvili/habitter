import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/clients/server";
export const GET = async (
	req: NextRequest,
	{ params: { habit_id } }: { params: { habit_id: string } }
) => {
	try {
		const searchParams = req.nextUrl.searchParams;

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
			.select(`*`)
			.eq("habit_id", habit_id);

		if (error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		const formattedData = data.map((habit) => ({
			id: habit.id,
			created_at: habit.created_at,
			habit_id: habit.habit_id,
		}));

		return NextResponse.json(formattedData, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: e }, { status: 500 });
	}
};
