type Props = {
	date: Date;
};

const MonthYear: React.FC<Props> = ({ date }) => {
	return (<div>{date.getFullYear()} {date.toLocaleString('default', {month: "short"})}</div>);
};

export default MonthYear;
