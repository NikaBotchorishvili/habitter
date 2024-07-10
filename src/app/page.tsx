import { PrivateRoute } from "@/components/common/PrivateRoute";
import { completedHabits, getCurrentUser, getHabitsByUser } from "./actions";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { UserResponse } from "@supabase/supabase-js";
import Dashboard from "@/components/Dashboard";
import { Suspense } from "react";
import Loading from "./edit/[habit_id]/loading";
import fetchWrapper from "@/utils/fetchWrapper";
import { Database } from "../../types/supabase";



export default async function Home() {
	const currentUser = await getCurrentUser();
	let habitsByUser = await getHabitsByUser() || [];
	let completionsData = await completedHabits() || [];

	return (
		<PrivateRoute>
			<XCenterContainer>
				<Suspense fallback={<Loading />}>
					<Dashboard
						currentUser={currentUser}
						habitsByUser={habitsByUser}
						completionsData={completionsData}
					/>
				</Suspense>
			</XCenterContainer>
		</PrivateRoute>
	);
}

export const revalidate = 1;
