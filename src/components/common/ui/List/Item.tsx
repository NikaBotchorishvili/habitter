"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Delete from "./Delete";
import { useDrag } from "react-dnd";
import { toast } from "react-toastify";
import { ToastConfiguration } from "../Toast";

type Props = {
	item: any;
	fields: string[];
	edit: boolean;
	del: boolean;
	titleField: string;
	id: string;
	deleteHabit: (id: string) => void;
	linkTo?: string;
};

const Item: React.FC<Props> = ({
	item,
	fields,
	edit,
	del,
	titleField,
	id,
	deleteHabit,
	linkTo,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const [{ isDragging }, drag] = useDrag({
		type: "habit",
		item: { id: item.id },
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(),
		}),
	});
	drag(ref);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleTrashClick = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleCloseDeleteDialog = () => {
		setIsDeleteDialogOpen(false);
		deleteHabit;
	};

	const handleDelete = async () => {
		try {
			await deleteHabit(item.id);
			setIsDeleteDialogOpen(false);
			toast.success("Habit deleted successfully", ToastConfiguration);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			ref={ref}
			id={id}
			className={`flex select-none cursor-pointer dark:bg-opacity-100 rounded-sm py-1 px-5 bg-light bg-lightModeSecondary dark:bg-darkModeSecondary justify-between items-center text-xl ${
				isDragging && "dark:bg-opacity-100 bg-opacity-100"
			} dark:text-darkModeLight text-lightModePrimary font-bold`}
		>
			<Link href={`${linkTo}/${item.id}`} legacyBehavior>
				<a className="flex-1">
					{fields.map((field) => (
						<small key={field}>{item[field]}</small>
					))}
				</a>
			</Link>
			<div className="flex items-center gap-x-4">
				{edit && (
					<Link
						title={`Edit ${item["id"]}`}
						href={`/edit/${item["id"]}`}
						legacyBehavior
					>
						<a>
							<FontAwesomeIcon
								className="cursor-pointer size-[17px]"
								icon={faEdit}
							/>
						</a>
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
							onDelete={handleDelete}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default Item;
