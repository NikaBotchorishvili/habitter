"use client";
import React, { useRef } from "react";
import { Database } from "../../../../types/supabase";
import { useDrag } from "react-dnd";
import { itemTypes } from "./types/ItemTypes";

type Props = {
	habit: Database["public"]["Tables"]["habits"]["Row"];
	type: itemTypes;
	index: number;
};

const HabitItem: React.FC<Props> = (({ habit, type, index }) => {
	const ref = useRef<HTMLLIElement>(null);
	const [{ isDragging }, drag] = useDrag({
		item: {
			id: habit.id
		},
		type: type,
		collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
	});
	drag(ref);


	return (
		<li
			ref={ref}
			className={`flex select-none items-center gap-x-4 px-4 py-2 rounded-md dark:bg-darkModeMain ${isDragging ? "opacity-70" : ""}`}
		>
			{habit.title}
		</li>
	);
});

export default HabitItem;
