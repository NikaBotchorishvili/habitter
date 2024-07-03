"use client";
import Button from "@/components/common/ui/Button";
import Input from "@/components/common/ui/Input";
import { useForm } from "react-hook-form";
import { Database } from "../../../../types/supabase";
import { useRouter } from "next/navigation";

type Props = {
    onSubmitHandler: (habit: string) => Promise<void>;
    initialValues: Database["public"]["Tables"]["habits"]["Row"] | undefined;
}

export type FormData = {
	habit: string;
};

const HabitForm: React.FC<Props> = ({initialValues, onSubmitHandler}) => {
	const router = useRouter();
	const { register, handleSubmit, formState } = useForm<FormData>({defaultValues: {habit: initialValues?.title || ""}});
    const onSubmit = async (data: FormData) => {
		await onSubmitHandler(data.habit);
		if(initialValues){
			router.push("/")
		}
    };
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5 w-full">
			<Input
				label="Habit"
				register={register("habit")}
				placeholder="Enter a habit"
				error={formState.errors.habit?.message}
			/>
            <Button label="Submit" />
		</form>
	);
};

export default HabitForm;
