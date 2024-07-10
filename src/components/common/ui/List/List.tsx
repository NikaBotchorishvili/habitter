import { memo, useRef, useState, useCallback } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import Item from "./Item";
import { handleReOrderParams } from "../../../../../types/general";
import { Habit } from "@/app/manage/actions";

type Props = {
	data: any[];
	keyPrefix: string;
	fields: string[];
	edit?: boolean;
	del?: boolean;
	titleField: string;
	handleReOrder: ({ item_one_id, item_two_id }: handleReOrderParams) => void;
	handleDelete: (id: string) => void;
	linkTo?: string;
};

const List: React.FC<Props> = ({
	data,
	fields,
	keyPrefix,
	del = true,
	edit = true,
	titleField,
	handleReOrder,
	handleDelete,
	linkTo
}) => {
	const [hoveredItem, setHoveredItem] = useState<Habit | null>(null);

	const ref = useRef<HTMLUListElement>(null);

	const moveItem = useCallback((draggedItem: Habit, monitor: DropTargetMonitor) => {
		if (!ref.current) {
			return;
		}

		const hoverBoundingRect = ref.current.getBoundingClientRect();
		const clientOffset = monitor.getClientOffset();

		if (!clientOffset) {
			return;
		}

		const hoverClientY = clientOffset.y - hoverBoundingRect.top;

		data.forEach((item, index) => {
			const itemBoundingRect = document.getElementById(`${keyPrefix}-${item.id}`)?.getBoundingClientRect();

			if (itemBoundingRect) {
				const itemMiddleY = (itemBoundingRect.bottom - itemBoundingRect.top) / 2;
				const itemClientY = clientOffset.y - itemBoundingRect.top;

				if (draggedItem.id !== item.id && itemClientY < itemMiddleY && itemClientY > 0) {
					setHoveredItem(item);
				}
			}
		});
	}, [data, keyPrefix]);

	const [, drop] = useDrop({
		accept: "habit",
		hover: moveItem,
		drop: (draggedItem: Habit, monitor: DropTargetMonitor) => {
			if (!hoveredItem || draggedItem.id === hoveredItem.id) {
				return;
			}
			handleReOrder({
				item_one_id: draggedItem.id,
				item_two_id: hoveredItem.id,
			});

			setHoveredItem(null);
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	});

	drop(ref);

	return (
		<ul ref={ref} className="flex flex-col gap-y-2">
			{data.map((item) => (
				<Item
					deleteHabit={handleDelete}
					key={`${keyPrefix}-${item.id}`}
					id={`${keyPrefix}-${item.id}`}
					fields={fields}
					item={item}
					edit={edit}
					del={del}
					titleField={titleField}
					linkTo={linkTo}
				/>
			))}
		</ul>
	);
};

export default List;
