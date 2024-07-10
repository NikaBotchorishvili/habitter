import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Overlay from "../../OverlayWrapper";

type DeleteProps = {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
};

const Delete: React.FC<DeleteProps> = ({ isOpen, onClose, onDelete }) => {
	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<Overlay onClick={onClose}>
						<motion.dialog
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute bg-lightModeSecondary dark:bg-darkModeSecondary left-0 top-1/2 -translate-y-1/2 flex flex-col gap-y-3 text-darkModeWhite z-50 max-w-sm w-full p-5 rounded-lg dark:bg-darkModeMain"
							open
						>
							<FontAwesomeIcon
								icon={faX}
								onClick={onClose}
								className="self-end cursor-pointer size-[25px]"
							/>
							<small>
								Are you sure you want to delete this item?
							</small>
							<button
								className="dark:darkModeButtonV2 lightModeButtonV2"
								onClick={onDelete}
							>
								Confirm
							</button>
						</motion.dialog>
					</Overlay>
				)}
			</AnimatePresence>
		</>
	);
};

export default Delete;
