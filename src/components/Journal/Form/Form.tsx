"use client";
import ButtonV2 from "@/components/common/ui/ButtonV2";
import Input from "@/components/common/ui/Input";
import { useForm } from "react-hook-form";

type Props = {
	onSubmit: (content: string) => void;
};

const Form: React.FC<Props> = ({ onSubmit }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		setValue,
	} = useForm<{ content: string }>();

	return (
		<form
			onSubmit={handleSubmit(({ content }) => onSubmit(content))}
			className="flex flex-col gap-y-5 w-full"
		>
			<Input
				register={register("content", {
					minLength: {
						value: 20,
						message: "Content must be at least 20 characters long",
					},
                    required: {
                        message: "Content is required",
                        value: true
                    }
				})}
				label="Content"
				placeholder="What did you do today?"
				error={errors.content?.message}
			/>
			<ButtonV2 label="Add the entry" />
		</form>
	);
};

export default Form;
