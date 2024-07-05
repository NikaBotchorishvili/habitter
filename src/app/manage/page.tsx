import { PrivateRoute } from "@/components/common/PrivateRoute";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { getCurrentUser } from "../actions";
import { getHabitsByCurrentUser } from "./actions";

import ManageHabitsSection from "@/components/ManageHabits";

const Manage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser === null) return null;
	const habits = await getHabitsByCurrentUser();

	console.log(habits)
	return (
		<PrivateRoute>
			<XCenterContainer>
				<ManageHabitsSection
					habits={
						habits || { completedHabits: [], incompleteHabits: [ ] }
					}
				/>
			</XCenterContainer>
		</PrivateRoute>
	);
};

export default Manage;
