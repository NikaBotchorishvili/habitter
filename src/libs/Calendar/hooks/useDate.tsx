"use client";

import { useState } from "react";
import { Month, DateType, months } from "../types";

type ReturnType = {
    date: DateType;
    days: number[];
    handlePrev: () => void;
    handleNext: () => void;
    currentMonth: Month;
    firstDayOfTheMonth: number;
    lastDateOfTheLastMonth: number;
    lastDayOfTheMonth: number;
};

const useDate = (): ReturnType => {
    const [date, setDate] = useState<DateType>({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        days: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    });

    const days = Array.from({ length: date.days }, (_, index) => index + 1);

    const handlePrev = () => {
        setDate((prev) => {
            const newMonth = prev.month === 0 ? 11 : prev.month - 1;
            const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
            const newDays = new Date(newYear, newMonth + 1, 0).getDate();
            return { month: newMonth, year: newYear, days: newDays };
        });
    };

    const handleNext = () => {
        setDate((prev) => {
            const newMonth = prev.month === 11 ? 0 : prev.month + 1;
            const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
            const newDays = new Date(newYear, newMonth + 1, 0).getDate();
            return { month: newMonth, year: newYear, days: newDays };
        });
    };

    const firstDayOfTheMonth = (new Date(date.year, date.month, 1).getDay() + 6) % 7; // Adjust to make Monday the first day of the week
    const lastDateOfTheLastMonth = new Date(date.year, date.month, 0).getDate();
    const lastDayOfTheMonth = new Date(date.year, date.month + 1, 0).getDay();
    return {
        date: date,
        days: days,
        handlePrev: handlePrev,
        handleNext: handleNext,
        currentMonth: months[date.month],
        firstDayOfTheMonth: firstDayOfTheMonth,
        lastDateOfTheLastMonth: lastDateOfTheLastMonth,
        lastDayOfTheMonth: lastDayOfTheMonth
    };
};

export default useDate;
