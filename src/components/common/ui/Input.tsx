import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
    label: string;
    placeholder: string;
    error?: string;
    register: UseFormRegisterReturn;
    type?: string;
}

const Input: React.FC<Props> = ({label, placeholder, error, register, type = "text"}) => {
	return (
        <div className="flex flex-col gap-y-1  w-full">
            <label htmlFor="">{label}</label>
            <input
                className="dark:darkModeInput lightModeInput w-full"
                placeholder={placeholder}
                type={type}
                {...register}
            />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
