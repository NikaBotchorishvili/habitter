"use client";
import { SubmitHandler, useForm } from "react-hook-form";

import ButtonV2 from "../common/ui/ButtonV2";
import Overlay from "../common/Overlay";
import OverlayWrapper from "../common/OverlayWrapper";

type FormData = {
	entry: string;
};

type Props = {
	onClose: () => void;
	completedHabitId: string | null;
};

const JournalModal: React.FC<Props> = ({ onClose, completedHabitId }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
	};
	return (
		<>
			<OverlayWrapper onClick={onClose}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex absolute left-1/2  top-1/2 -translate-y-1/2  z-[1100]  flex-col gap-y-4 p-5 rounded-md box-content bg-lightModeSecondary dark:bg-darkModeSecondary"
				>
					<div>
						<textarea
							className="lightModeInput dark:darkModeInput "
							{...register("entry", {
								minLength: {
									value: 8,
									message:
										"Entry must have at least 8 character",
								},
							})}
							placeholder="Write your entry here"
						></textarea>
					</div>
					<div className="flex gap-x-5">
						<button
							className="lightModeButtonV2 dark:darkModeButtonV2"
							onClick={onClose}
							type="button"
						>
							Cancel
						</button>
						<ButtonV2 label="Add entry" />
					</div>
				</form>
			</OverlayWrapper>
		</>
	);
};

export default JournalModal;
