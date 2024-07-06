"use client"
import { useForm } from "react-hook-form";
import Input from "../common/ui/Input";
import ButtonV2 from "../common/ui/ButtonV2";

export const JournalForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm<{ content: string }>();
	return (
		<section className="flex flex-col gap-y-3 md:min-w-md w-full bg-darkModeSecondary p-5 rounded-md">
			<h2 className="text-center text-xl">New journal entry</h2>
			<form className="flex flex-col gap-y-5  w-full">
				<Input
					register={register("content")}
					label="Content"
					placeholder="What did you do today?"
					error={errors.content?.message}
				/>
                <ButtonV2 label="Add the entry" />
			</form>
		</section>
	);
};
