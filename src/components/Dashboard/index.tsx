import Calendar from "@/libs/Calendar";
import { Database } from "../../../types/supabase";
import { User } from "@supabase/supabase-js";
import HabitForm from "./components/HabitForm";
import { createClient } from "@/utils/supabase/clients/server";
import { revalidatePath, revalidateTag } from "next/cache";
import HabitsList from "./components/HabitsList";

type Props = {
	currentUser: User | null;
	habitsByUser: Database["public"]["Tables"]["habits"]["Row"][] | undefined;
};

const Dashboard: React.FC<Props> = ({ currentUser, habitsByUser }) => {
	const handleAddNewHabit = async (habit: string) => {
		"use server";
		try {
			const supabase = await createClient();

			const { error } = await supabase
				.from("habits")
				.insert({ title: habit, user_id: currentUser?.id });

			if (error) throw error;
			revalidatePath("", 'page');
		} catch (error) {
			console.error(error);
		}
	};
	
	return (
		<div className="flex flex-col items-center gap-y-16">
			<h1 className="text-3xl">Welcome Back, {currentUser?.email}</h1>
			<section className="flex flex-col gap-y-3">
				<h2 className="text-3xl font-bold border-b border-b-white ">
					Your Habits
				</h2>
				{habitsByUser && <HabitsList habits={habitsByUser} />}
			</section>
			<div className="space-y-5 max-w-md mx-auto w-full">
				<h2 className="text-xl text-center">Create a new habit!</h2>
				<HabitForm
					initialValues={undefined}
					onSubmitHandler={handleAddNewHabit}
				/>
			</div>
			<div className="fixed right-10 bottom-10">
				<Calendar togglable={true} />
			</div>
		</div>
	);
};

export default Dashboard;
