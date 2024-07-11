import { getHabitById } from "@/app/actions";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { getCompletedHabitsById } from "../actions";
import Insights from "@/components/Insights";
import { format, startOfMonth } from "date-fns";
import Calendar from "@/libs/Calendar";

const InsightsPage = async ({
	params: { habit_id },
}: {
	params: { habit_id: string };
}) => {
	const habit = await getHabitById(habit_id);

	const completions = (await getCompletedHabitsById(habit_id)) || [];
	const startDate = format(startOfMonth(new Date()), "yyyy-MM-dd");
	const endDate = format(new Date(), "yyyy-MM-dd");
	return (
		<XCenterContainer>
			<h1 className="text-2xl">Insights for habit {habit.title}</h1>

			<Insights
				habit={habit}
				startDate={startDate}
				endDate={endDate}
				completions={completions}
			/>

			<Calendar
				type="activity"
				activity={completions}
				dateField="created_at"
			/>
		</XCenterContainer>
	);
};

export default InsightsPage;
