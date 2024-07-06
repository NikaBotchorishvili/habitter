import { PrivateRoute } from "@/components/common/PrivateRoute";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { getCurrentUser } from "../actions";
import { getHabitsByCurrentUser, UserActivity } from "./actions";

import ManageHabitsSection from "@/components/ManageHabits";
import Calendar from "@/libs/Calendar";

const Manage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser === null) return null;
	const habits = await getHabitsByCurrentUser();
	const allUserCompletedHabits = await UserActivity();
	return (
		<PrivateRoute>
			<XCenterContainer>
				<section className="flex flex-col items-center justify-center gap-y-16">
					<h1 className="text-3xl text-lightModePrimary dark:text-darkModePrimary">Manage Habits</h1>
					<section className="flex flex-col items-center justify-center space-y-4">
						<ManageHabitsSection
							habits={
								habits || {
									completedHabits: [],
									incompleteHabits: [],
								}
							}
						/>
					</section>
				</section>
				<Calendar dateField="created_at" activity={allUserCompletedHabits?.data || []} type="activity" />
			</XCenterContainer>
		</PrivateRoute>
	);
};

export default Manage;
