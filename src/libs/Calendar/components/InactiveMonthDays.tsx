type Props = {
	day: number;
};

const InactiveMonthDays: React.FC<Props> = ({ day }) => {
	return (
		<div className="col-span-1 bg-lightModeSecondary dark:bg-darkModeSecondary opacity-60 p-1 box-content rounded shadow text-center cursor-pointer">
			{day}
		</div>
	);
};

export default InactiveMonthDays;
