import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Database } from "../../../../types/supabase";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

type Props = {
	habit: Database["public"]["Tables"]["habits"]["Row"];
};

const Habit: React.FC<Props> = ({ habit }) => {
	return (
		<li className="flex justify-between items-center text-lg text-white">
			<small>{habit.title}</small>

			<div className="flex items-center gap-x-4">
				<Link href={`/edit/${habit.id}`}>
					<FontAwesomeIcon
						className="cursor-pointer size-[17px]"
						icon={faEdit}
						title={`Edit ${habit.title}`}
					/>
				</Link>
				<FontAwesomeIcon
					className="cursor-pointer size-[17px]"
					icon={faTrash}
					title={`Delete ${habit.title}`}
				/>
			</div>
		</li>
	);
};

export default Habit;
