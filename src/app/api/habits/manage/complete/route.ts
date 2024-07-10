import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const supabase = await createClient();

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        if (!user) {
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        const { data: habitsData, error: habitsError } = await supabase
            .from("completed_habits")
            .select(`
                id,
                created_at,
                habit_id,
                habits!inner (
                    title
                )
            `)
            .eq("habits.user_id", user.id)

        if (habitsError) {
            return NextResponse.json({ error: habitsError.message }, { status: 500 });
        }

		if (!habitsData) {
			return NextResponse.json({ error: "No data found" }, { status: 404 });
		}
    
        const formattedData = habitsData.map((habit) => ({
            id: habit.id,
            created_at: habit.created_at,
            habit_id: habit.habit_id,
            title: habit.habits.title,
        }));

        return NextResponse.json({ data: formattedData }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: "Error fetching habits" }, { status: 500 });
    }
}
