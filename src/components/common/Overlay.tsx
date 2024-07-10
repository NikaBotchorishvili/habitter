"use client";

type Props = {
	onClick: () => void;
};

const Overlay: React.FC<Props> = ({ onClick }) => {
	return (
		<div
			onClick={onClick}
			className="fixed w-dvw h-dvh z-[100] inset-0 bg-black dark:bg-opacity-30 bg-opacity-30 "
		></div>
	);
};

export default Overlay;
