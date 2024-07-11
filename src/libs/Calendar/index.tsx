import React from "react";
import CalendarComponent from "./Calendar";

type Props = {
	type?: "activity" | "normal";
	togglable?: boolean;
	activity: any;
	dateField: string;
};

const Calendar: React.FC<Props> = ({
	type = "normal",
	togglable = false,
	activity,
	dateField,
}) => {
	return type === "activity" ? (
		<>
			<CalendarComponent
				dateField={dateField}
				activity={activity}
				togglable={togglable}
			/>
		</>
	) : (
		<CalendarComponent dateField={dateField} togglable={togglable} />
	);
};

export default Calendar;
