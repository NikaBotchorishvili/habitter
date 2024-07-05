import React from "react";
import { CompleteAndIncompleteHabits } from "@/app/manage/actions";
import HabitList from "./components/List";
import Calendar from "@/libs/Calendar";

type Props = {
	habits: CompleteAndIncompleteHabits;
};

const ManageHabitsSection: React.FC<Props> = ({ habits }) => {

	return (
		<article className="flex justify-center items-center flex-col gap-y-5">
			<h2 className="text-2xl font-bold">Today&apos;s habits</h2>
			<HabitList habits={habits} />
		</article>
	);
};

export default ManageHabitsSection;
