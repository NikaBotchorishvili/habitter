"use client";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Overlay from "@/components/common/Overlay";
import Form from "./Form";
import { addJournalEntry } from "@/app/journal/actions";

const JournalAddForm = () => {
	const [addToggled, setAddToggled] = useState<boolean>(false);

	
	const onSubmit = async (content: string) => {
		try{
			await addJournalEntry(content)
			setAddToggled(false)
		}catch(e){
			console.error(e)
		}
	}
	return (
		<AnimatePresence>
			{addToggled && (
				<>
					<Overlay onClick={() => {setAddToggled(false)}}/>
						<motion.section
							className="absolute left-1/2 -translate-x-1/2 md:max-w-[400px] w-full"
							initial={{ top: -1000 }}
							animate={{ top: 150 }}
							exit={{ top: -1000 }}
						>
							<div
								onClick={(e) => {
									e.stopPropagation();
								}}
								className="flex flex-col gap-y-3 w-full bg-lightModeSecondary dark:bg-darkModeSecondary p-5 rounded-md z-20"
							>
								<FontAwesomeIcon
									onClick={() => setAddToggled(false)}
									className="cursor-pointer left-5  -top-8 absolute size-[25px]"
									icon={faX}
								/>
								<h2 className="text-center text-xl">
									New journal entry
								</h2>
								<Form onSubmit={onSubmit}/>
							</div>
						</motion.section>
				</>
			)}
			<FontAwesomeIcon
				key="addButton"
				title="New journal entry"
				className="size-[25px] cursor-pointer"
				onClick={() => setAddToggled(true)}
				icon={faPlusCircle}
			/>
		</AnimatePresence>
	);
};
export default JournalAddForm