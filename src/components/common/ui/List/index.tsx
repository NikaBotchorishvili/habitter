"use client";
import React, { useEffect, useState } from "react";
import { handleReOrderParams } from "../../../../../types/general";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import List from "./List";

type Props = {
	items: any[];
	fields: any[];
	handleReOrder: ({ item_one_id, item_two_id }: handleReOrderParams) => void;
	linkTo?: string;
	keyPrefix: string;
	titleField?: string;
	edit?: boolean;
	del?: boolean;
	handleDelete: (id: string) => void;
};

const ListComponent: React.FC<Props> = ({
	fields,
	items,
	handleReOrder,
	keyPrefix,
	edit = true,
	del = true,
	titleField = "title",
	handleDelete,
	linkTo
}) => {
	const [localData, setLocalData] = useState<typeof items>(items || []);

	useEffect(() => {
		setLocalData(items);
	}, [items]);


	return (
		<DndProvider backend={HTML5Backend}>
			<List
				fields={fields}
				keyPrefix={keyPrefix}
				titleField={titleField}
				del={del}
				edit={edit}
				data={localData}
				handleReOrder={handleReOrder}
				handleDelete={handleDelete}
				linkTo={linkTo}
			/>
		</DndProvider>
	);
};

export default ListComponent;
