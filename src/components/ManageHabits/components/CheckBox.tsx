import React from "react";

type Props = {
	label: string;
	completed: boolean;
	onChange: () => void;
};

const Checkbox: React.FC<Props> = ({ label, completed, onChange }) => {
	return (
		<div onClick={onChange} className="relative flex items-center space-x-2">
			<input
				className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded transition duration-150 ease-in-out"
				id={label}
				type="checkbox"
				checked={completed}
				onChange={onChange}
			/>
			<label className="text-white cursor-pointer" htmlFor={label}>
				{label}
			</label>
		</div>
	);
};

export default Checkbox;
