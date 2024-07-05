import React from "react";
import CalendarComponent from "./Calendar";
import { Habit } from "@/app/manage/actions";

type Props = {
	type?: "activity" | "normal";
	togglable?: boolean;
    activity: any;
	dateField: string;
};

const Calendar: React.FC<Props> = ({ type = "normal", togglable = false, activity,dateField }) => {
	return type === "activity" ? (
        <>
            <h1>Activity Calendar</h1>
		    <CalendarComponent dateField={dateField} activity={activity} togglable={togglable} />
        </>
	) : (
		<CalendarComponent  dateField={dateField} togglable={togglable} />
	);
};

export default Calendar;
