import { PrivateRoute } from "@/components/common/PrivateRoute";
import { supabase } from "@/utils/supabase/clients/client";
import { getCurrentUser } from "./actions";
import Calendar from "@/app/libs/Calendar";
import Link from "next/link";
import Button from "@/components/common/ui/Button";
export default async function Home() {
	const getHabits = async () => {
		try {
			const { data, error } = await supabase.from("habits").select("*");

			if (error) throw error;

			return data;
		} catch (error) {
			console.error(error);
		}
	};

	let data = await getHabits();

	const currentUser = getCurrentUser();
	return (
		<PrivateRoute>
			<section className="flex flex-col items-center mt-10">
				<div className="flex flex-col gap-y-5">
					{currentUser && (
						<p>
							Welcome Back, {(await currentUser).data.user?.email}
						</p>
					)}

					<ul>
						{data &&
							data.map((habit) => (
								<li
									className="text-3xl text-white"
									key={habit.id}
								>
									{habit.title}
								</li>
							))}
					</ul>
					<Link href="#" className="dark:darkModeButton">
						Add a new habit
					</Link>
					<div className="fixed right-10 bottom-10">
						<Calendar />
					</div>
				</div>
			</section>
		</PrivateRoute>
	);
}
