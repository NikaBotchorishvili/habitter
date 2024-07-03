"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../common/ui/Input";
import Button from "../common/ui/Button";
import CenterContainer from "../containers/CenterContainer";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type LoginForm = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
	} = useForm<LoginForm>();

	const router = useRouter();
	const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
		try {
			const response = await fetch("/api/auth/login", {
				body: JSON.stringify({ email, password }),
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				const data = await response.json();
				console.log(response)
				if (data && data.error) {
					setError("root", { message: data.error });
					return;
				}
				throw new Error("Failed to login");
			}

			router.replace("/")
		} catch (error) {
			console.log(error)
		}
	};

	return (
		<CenterContainer className="gap-y-5">
			<h1 className="text-3xl">Log in</h1>
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
							message: "Email must be at least 4 characters long",
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
				{errors.root &&<i>{errors.root.message}</i>}
				<Button label="Login" />
			</form>
			<div>
				<span>Don&apos;t have an account yet? Register from </span>
				<Link className="underline text-blue-500" href="/register">Here</Link>
			</div>
		</CenterContainer>
	);
};

export default LoginForm;
