import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/clients/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const type = searchParams.get("type") as EmailOtpType | null;

	if (code && type) {
		const supabase = await createClient();

		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (!error) {
			// redirect user to specified redirect URL or root of app
			redirect("/");
		}
	}

	// redirect the user to an error page with some instructions
	redirect("/error");
}
