export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
] as const;

export type DateType = {
	year: number;
	month: number;
	days: number;
};

export type Month = typeof months[number];