import React, { useRef } from "react";
import { useDrop } from "react-dnd";

import { itemTypes } from "../types/ItemTypes";
import { Database } from "../../../../../types/supabase";
import HabitItem from "../Item";

type Props = {
	habits: Database["public"]["Tables"]["habits"]["Row"][];
	type: itemTypes;
	accept: itemTypes;
	handleFunction: (id: string) => Promise<void>;
};

const DropList: React.FC<Props> = ({ habits, type, accept, handleFunction }) => {
	const ref = useRef<HTMLUListElement>(null);
	const [{}, dropCompleted] = useDrop({
		accept: accept,
		drop: async(item: Database["public"]["Tables"]["habits"]["Row"]) => {
			if(item && item.id){
				console.log("Dropped item:", item.id)
				await handleFunction(item.id)
			}
		},
		collect(monitor) {
			return {
				isOver: monitor.isOver(),
				canDrop: monitor.canDrop(),
			};
		},
	});

	dropCompleted(ref);
	return (
		<ul ref={ref} className="flex flex-col min-h-[300px] gap-y-3">
			{habits.map((habit, index) => (
				<HabitItem
					key={`${type}-item-${index}`}
					habit={habit}
					index={index}
					type={type}
				/>
			))}
		</ul>
	);
};

export default DropList;
