import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "../../../../types/supabase";
import { request } from "http";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "@/app/actions";
import { cookies } from "next/headers";

type HabitsResponse = Database["public"]["Tables"]["habits"]["Row"][];

export const GET = async (request: NextRequest): Promise<NextResponse> => {
	"use server";
	const supabase = await createClient();
	const { data: user, error: userError } = await supabase.auth.getUser();

	if (userError || !user) {
		console.error("Error fetching user:", userError);
		return NextResponse.json(
			{ error: "User not authenticated" },
			{ status: 401 }
		);
	}

	const { data, error } = await supabase
		.from("habits")
		.select("*")
		.eq("user_id", user?.user.id);

	if (error) {
		console.error("Error fetching habits:", error);
		return NextResponse.json(
			{ error: "Error fetching habits" },
			{ status: 500 }
		);
	}

	return NextResponse.json(data as HabitsResponse, { status: 200 });
};

export async function POST(req: NextRequest) {
    try {
        const { habit_title } = await req.json();
        if (!habit_title) {
            return NextResponse.json({ message: 'Habit title is required' }, { status: 400 });
        }
        const authToken = req.headers.get('cookie')

        if (!authToken || authToken === "") {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const supabase = await createClient();
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const { data, error } = await supabase
            .from('habits')
            .insert([{ title: habit_title, user_id: user.id}]);

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
