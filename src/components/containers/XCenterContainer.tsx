type Props = {
	children: React.ReactNode;
};
const XCenterContainer: React.FC<Props> = ({ children }) => {
	return (
		<main className="flex flex-col items-center mt-10">
			{children}
		</main>
	);
};

export default XCenterContainer;
