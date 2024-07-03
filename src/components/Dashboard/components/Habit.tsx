import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Database } from "../../../../types/supabase";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Props = {
	habit: Database["public"]["Tables"]["habits"]["Row"];
};

const Habit: React.FC<Props> = ({ habit }) => {
	const {
		active,
		setNodeRef,
		listeners,
		attributes,
		isDragging,
		transform,
		transition,
	} = useSortable({
		id: habit.id,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	return (
		<li
			{...listeners}
			{...attributes}
			style={style}
			ref={setNodeRef}
			className={`flex ${
				isDragging && "bg-green-900"
			} justify-between items-center text-lg text-white`}
		>
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
