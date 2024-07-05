import Calendar from "@/libs/Calendar";
import { Database } from "../../../types/supabase";
import { User } from "@supabase/supabase-js";
import HabitForm from "./components/HabitForm";
import { createClient } from "@/utils/supabase/clients/server";
import HabitsList from "./components/HabitsList";
import { createNewHabit } from "@/app/actions";

type Props = {
	currentUser: User | null;
	habitsByUser: Database["public"]["Tables"]["habits"]["Row"][] | null;
};

const Dashboard: React.FC<Props> = ({ currentUser, habitsByUser }) => {


	return (
		<div className="flex flex-col items-center md:max-w-md gap-y-16">
			<h1 className="text-3xl">Welcome Back, {currentUser?.email}</h1>
			<section className="space-y-5  mx-auto w-full">
				<h2 className="text-xl text-center">Create a new habit!</h2>
				<HabitForm
					initialValues={undefined}
					onSubmitHandler={createNewHabit}
				/>
			</section>
			<section className="flex w-full flex-col gap-y-3">
				<h2 className="text-3xl font-bold border-b border-b-white ">
					Your Habits
				</h2>
				{habitsByUser && <HabitsList habits={habitsByUser} />}
			</section>

			<div className="fixed right-10 bottom-10">
				<Calendar togglable={true} />
			</div>
		</div>
	);
};

export default Dashboard;
