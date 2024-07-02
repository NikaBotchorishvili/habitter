"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/ui/Input";
import Button from "../common/ui/Button";
import CenterContainer from "../containers/CenterContainer";
import Link from "next/link";

export type RegisterForm = {
	email: string;
	password: string;
};
const RegisterForm = () => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm<RegisterForm>();

	const onSubmit: SubmitHandler<RegisterForm> = async ({ email, password }) => {
		try {
			const response = await fetch("/api/auth/login", {
				body: JSON.stringify({ email, password }),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await response.json();
		} catch(error) {
			console.error(error);
		}
	};
	return (
		<CenterContainer className="gap-y-5">
			<h1 className="text-3xl">Register</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex mx-auto flex-col gap-y-3 max-w-[300px] w-full"
			>
				<Input
					placeholder={"Enter an email"}
					label="Email"
					register={register("email", {
						required: "This field is required",
						minLength: {
							value: 4,
							message: "email must be at least 4 characters long",
						},
					})}
					error={errors.email?.message}
				/>
				<Input
					placeholder={"Enter a password"}
					label="Password"
					register={register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message:
								"Password must be at least 8 characters long",
						},
					})}
					error={errors.password?.message}
					type="password"
				/>
				{errors.root && (
					<i className="text-red-500">{errors.root.message}</i>
				)}
				<Button label="Register" />
			</form>
			<div>
				<span>Already have an account? Login from </span>
				<Link className="underline text-blue-500" href="/login">Here</Link>
			</div>
		</CenterContainer>
	);
};

export default RegisterForm;
