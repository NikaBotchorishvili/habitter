import { PrivateRoute } from "@/components/common/PrivateRoute";
import { supabase } from "@/libs/supabase/clients/client";
import { getCurrentUser } from "./actions";

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
			<section className="text-white">
				{currentUser && (
					<p>Welcome Back, {(await currentUser).data.user?.email}</p>
				)}
				{data &&
					data.map((habit) => (
						<p className="text-3xl text-white" key={habit.id}>
							{habit.title}
						</p>
					))}
			</section>
		</PrivateRoute>
	);
}
