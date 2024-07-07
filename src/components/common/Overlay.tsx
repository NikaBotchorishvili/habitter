"use client";

type Props = {
	onClick: () => void;
	children: React.ReactNode;
};

const Overlay: React.FC<Props> = ({ onClick, children }) => {
	return (
		<div onClick={onClick} className="fixed z-[1000] inset-0 bg-black bg-opacity-30 ">
			{children}
		</div>
	);
};

export default Overlay;
