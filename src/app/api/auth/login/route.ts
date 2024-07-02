import { createClient } from "@/libs/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export type LoginData = {
	email: string;
	password: string;
};

export async function POST (request: NextRequest) {
	const { email, password } = (await request.json()) as LoginData;
	if (email.trim() === "" || !email) {
		return NextResponse.json(
			{ error: "Email is required" },
			{ status: 400 }
		);
	}
	if (password.trim() === "" || !password) {
		return NextResponse.json(
			{ error: "Password is required" },
			{ status: 400 }
		);
	}

	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});
    
	if (error) {
        console.log(error)
		return NextResponse.json({ error: error.message }, { status: 401 });
	}
	return NextResponse.json({ message: "Login successful" }, { status: 200 });
};
