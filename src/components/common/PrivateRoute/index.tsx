import { createClient } from "@/utils/supabase/clients/server";
import { redirect } from "next/navigation";

type Props = {
	children: React.ReactNode;
};

export const PrivateRoute = async ({ children }: Props) => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();
	if (error || !data?.user) {
		redirect("/login");
	}

	return <>{children}</>;
	// return <p>Hello {data.user.email}</p>
};
