import { useEffect, useRef } from "react";

const generateYears = (start: number, end: number) => {
	const years = [];
	for (let i = start; i <= end; i++) {
		years.push(i);
	}
	return years;
};

type Props = {
    presentYear: number;
    selectedYear: number;
    handleYearClick: (year: number) => void;
}


const Years: React.FC<Props> = ({ presentYear, selectedYear, handleYearClick }) => {
    const selectedYearRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
		if (selectedYearRef.current) {
			selectedYearRef.current.scrollIntoView({
				block: "center",
			});
		}
	}, [selectedYear]);
  return (
    <section className="grid grid-cols-3 gap-y-3 h-[250px] overflow-y-scroll">
					{generateYears(presentYear - 11, presentYear).map(
						(year) => (
							<div
								className={`text-lg cursor-pointer ${
									year === selectedYear
										? "font-bold text-blue-500"
										: ""
								}`}
								key={year}
								onClick={() => handleYearClick(year)}
								ref={
									year === selectedYear
										? selectedYearRef
										: null
								}
							>
								<h2>{year}</h2>
							</div>
						)
					)}
				</section>
  )
}


export default Years