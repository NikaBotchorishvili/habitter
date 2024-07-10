"use client";

type Props = {
	onClick: () => void;
	children: React.ReactNode;
};

const OverlayWrapper: React.FC<Props> = ({ onClick, children }) => {
	return (
		<div onClick={onClick} className="fixed flex w-dvw h-dvh z-[1000] inset-0 bg-black dark:bg-opacity-30 bg-opacity-30 ">
			{children}
		</div>
	);
};

export default OverlayWrapper;
