import { createClient } from "@/utils/supabase/clients/server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params: { id: habit_id } }: { params: { id: string } }
) {
	try {
		const supabase = await createClient();
		const { data, error } = await supabase
			.from("habits")
			.select("*")
			.eq("id", habit_id)
			.single();

		if (error) {
			console.log(error);
			return NextResponse.json(
				{ error: "Error fetching habit" },
				{ status: 500 }
			);
		}

		if (!data) {
			return NextResponse.json(
				{ error: "No data found" },
				{ status: 404 }
			);
		}
		const { data: completedHabitData, error: completedHabitError } =
			await supabase
				.from("completed_habits")
				.insert([{ habit_id: habit_id }])
				.select("*")
				.single();

		if (completedHabitError) {
			return NextResponse.json(
				{ error: "Error completing habit" },
				{ status: 500 }
			);
		}
		
		return NextResponse.json({ completedHabitData }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Error completing habit" },
			{ status: 500 }
		);
	}
}
