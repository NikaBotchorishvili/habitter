"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import ButtonV2 from "../common/ui/ButtonV2";
import OverlayWrapper from "../common/OverlayWrapper";
import { addCompletedHabitEntry } from "@/app/manage/actions";

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
		getValues,
		handleSubmit,
		watch,
	} = useForm<FormData>({ defaultValues: { entry: "" } });

	const onSubmit: SubmitHandler<FormData> = (data) => {
		if(completedHabitId){
			addCompletedHabitEntry(completedHabitId, data.entry);
		}
		onClose();
	};

	const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	const entryValue = watch("entry");

	return (
		<OverlayWrapper onClick={onClose}>
			<div
				onClick={handleModalClick}
				className="flex absolute left-1/2 top-1/2 -translate-y-1/2 z-[1100] flex-col gap-y-4 p-8 rounded-lg box-content bg-lightModeSecondary dark:bg-darkModeSecondary max-w-[250px] w-full resize-none"
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex w-full flex-col gap-y-4"
				>
					<div className="flex flex-col gap-y-2">
						<textarea
							className="lightModeInput dark:darkModeInput w-full"
							{...register("entry", {
								minLength: {
									value: 8,
									message:
										"Entry must have at least 8 characters",
								},
							})}
							rows={4}
							placeholder="Write your entry here"
						></textarea>
						<div className="text-right text-sm text-gray-500">
							Word count:{" "}
							<span id="wordCount">{entryValue.length}</span>
						</div>
						{errors.entry && <p>{errors.entry.message}</p>}
					</div>
					<div className="flex w-full justify-between">
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
			</div>
		</OverlayWrapper>
	);
};

export default JournalModal;
