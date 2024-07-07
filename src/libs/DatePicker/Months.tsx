const getMonths = () => {
    const date = new Date();
    return Array.from({ length: 12 }, (_, i) => {
        date.setMonth(i);
        return date.toLocaleString("default", { month: "short" });
    });
};
const months = getMonths();

type Props = {
    selectedMonth: number | null;
    handleMonthClick: (monthIndex: number) => void;
}

const Months: React.FC<Props> = ({ handleMonthClick, selectedMonth }) => {
  return (
    <section className="grid grid-cols-3 gap-4">
					{months.map((month, index) => (
						<div
							className={`text-md cursor-pointer  ${
								index === selectedMonth
									? "font-bold dark:text-darkModePrimary text-lightModePrimary"
									: "dark:text-white text-white"
							}`}
							key={month}
							onClick={() => handleMonthClick(index)}
						>
							<h2>{month}</h2>
						</div>
					))}
				</section>
  )
}

export default Months