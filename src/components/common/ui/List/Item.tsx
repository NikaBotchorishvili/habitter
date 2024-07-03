import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
type Props = {
	item: any;
	fields: string[];
	edit: boolean;
	del: boolean;
	titleField: string
};

const Habit: React.FC<Props> = ({ item, fields, edit, del, titleField }) => {
	const { setNodeRef, listeners, attributes, transform, transition } =
		useSortable({
			id: item.id,
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
			className={`flex select-none  cursor-grab justify-between items-center text-lg text-white`}
		>
			{fields.map((field) => (
				<small key={field}>{item[field]}</small>
			))}

			<div className="flex items-center gap-x-4">
				{edit && (
					<Link
						title={`Edit ${item[titleField]}`}
						href={`/edit/${item[titleField]}`}
					>
						<FontAwesomeIcon
							className="cursor-pointer size-[17px]"
							icon={faEdit}
						/>
					</Link>
				)}
				{del && (
					<FontAwesomeIcon
						className="cursor-pointer size-[17px]"
						icon={faTrash}
					/>
				)}
			</div>
		</li>
	);
};

export default Habit;
