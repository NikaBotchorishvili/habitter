import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	try {
		const { habit_id, content } = await req.json();

		if (!habit_id) {
			return NextResponse.json(
				{ error: "Missing habit_id" },
				{ status: 400 }
			);
		}

		if (!content) {
			return NextResponse.json(
				{ error: "Missing content" },
				{ status: 400 }
			);
		}
		const supabase = await createClient();

		const { data, error } = await supabase
			.from("completed_habits")
			.select("*")
			.eq("habit_id", habit_id).single();

		if (error) {
			console.log(error)
			return NextResponse.json({ error: error }, { status: 500 });
		}

		if (!data) {
			return NextResponse.json(
				{ error: "No data found" },
				{ status: 404 }
			);
		}
		const { data: entryData, error: entryError } = await supabase
			.from("habit_completion_journal")
			.insert({
				content: content,
				completed_habit_id: data.id,
			})
			.select("*")
			.single();

		if (entryError) {
			console.log(entryError)
			return NextResponse.json({ error: entryError }, { status: 500 });
		}

		if (!entryData) {
			return NextResponse.json(
				{ error: "No data found" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ entryData }, { status: 200 });
	} catch (e) {
		return NextResponse.json({ error: e }, { status: 500 });
	}
};
