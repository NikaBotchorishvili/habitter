import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req: NextRequest) => {
    try {
		const supabase = await createClient();
		const today = new Date().toISOString().split("T")[0];
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if(userError){
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }

        if(!user){
            return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
        }
		const { data: habitsData, error: habitsError } = await supabase
			.from("habits")
			.select("*")
			.eq("user_id", user.id)
			.order("ordering", { ascending: true });

		if (habitsError) throw habitsError;
		if (!habitsData) throw new Error("No data found");

		const todayStart = `${today}T00:00:00.000Z`;
		const todayEnd = `${today}T23:59:59.999Z`;
		const { data: completedHabitsData, error: completedHabitsError } =
			await supabase
				.from("completed_habits")
				.select("*")
				.gte("created_at", todayStart)
				.lte("created_at", todayEnd);

		if (completedHabitsError) throw completedHabitsError;

		const completedHabitIds = completedHabitsData
			? completedHabitsData.map((ch) => ch.habit_id)
			: [];
		const completedHabits = habitsData.filter((habit) =>
			completedHabitIds.includes(habit.id)
		);
		const incompleteHabits = habitsData.filter(
			(habit) => !completedHabitIds.includes(habit.id)
		);

		return NextResponse.json({ completedHabits, incompleteHabits }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Error fetching habits" }, { status: 500 });
	}
}