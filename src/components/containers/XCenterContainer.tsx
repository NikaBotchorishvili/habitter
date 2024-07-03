type Props = {
	children: React.ReactNode;
};
const XCenterContainer: React.FC<Props> = ({ children }) => {
	return (
		<section className="flex flex-col items-center mt-10">
			{children}
		</section>
	);
};

export default XCenterContainer;
