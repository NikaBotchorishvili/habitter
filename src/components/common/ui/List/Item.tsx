"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useState } from "react";
import Delete from "./Delete";

type Props = {
	item: any;
	fields: string[];
	edit: boolean;
	del: boolean;
	titleField: string;
};

const Item: React.FC<Props> = ({ item, fields, edit, del, titleField }) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleTrashClick = () => {
		setIsDeleteDialogOpen(true);
		console.log("Trash click: showing dialog");
	};

	const handleCloseDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		console.log("Closing dialog");
	};

	return (
		<li
			className={`flex select-none cursor-pointer justify-between items-center text-lg text-white`}
		>
			{fields.map((field) => (
				<small key={field}>{item[field]}</small>
			))}
			<div className="flex items-center gap-x-4">
				{edit && (
					<Link
						title={`Edit ${item["id"]}`}
						href={`/edit/${item["id"]}`}
					>
						<FontAwesomeIcon
							className="cursor-pointer size-[17px]"
							icon={faEdit}
						/>
					</Link>
				)}
				{del && (
					<>
						<FontAwesomeIcon
							className="cursor-pointer size-[17px]"
							icon={faTrash}
							onClick={handleTrashClick}
						/>
						<Delete
							isOpen={isDeleteDialogOpen}
							onClose={handleCloseDeleteDialog}
						/>
					</>
				)}
			</div>
		</li>
	);
};

export default Item;
