import { PrivateRoute } from "@/components/common/PrivateRoute";
import { supabase } from "@/utils/supabase/clients/client";
import { getCurrentUser } from "./actions";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { UserResponse } from "@supabase/supabase-js";
import Dashboard from "@/components/Dashboard";
import { Suspense } from "react";
import Loading from "./edit/[habit_id]/loading";
export default async function Home() {
	const getHabitsByCurrentUser = async (user: UserResponse) => {
		try {
			if (user.error) throw user.error;
			const { data, error } = await supabase
				.from("habits")
				.select("*")
				.eq("user_id", user.data.user?.id)
				.order("ordering", { ascending: true });

			if (error) throw error;

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	const currentUser = await getCurrentUser();
	let habitsByUser = await getHabitsByCurrentUser(currentUser);

	return (
		<PrivateRoute>
			<XCenterContainer>
				<Suspense fallback={<Loading />}>
					<Dashboard
						currentUser={currentUser.data.user}
						habitsByUser={habitsByUser}
					/>
				</Suspense>
			</XCenterContainer>
		</PrivateRoute>
	);
}

export const revalidate = 0;
