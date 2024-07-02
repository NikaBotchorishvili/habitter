import { createClient } from "@/libs/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export type RegisterData = {
	email: string;
	password: string;
};
export const POST = async (request: NextRequest) => {
	console.log("data")
	const url = new URL(request.url);

	const { email, password } = (await request.json()) as RegisterData;
	console.log(email, password)
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

	const { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			emailRedirectTo: `${url.origin}/auth/callback`,
		},
	});
	if(error){
		console.log(error)
		return NextResponse.json({ error: error.message }, { status: 401 });
	}
	return NextResponse.json({ message: "Registration successful" }, { status: 200 })
};
