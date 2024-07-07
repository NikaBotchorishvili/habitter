"use server"
import fetchWrapper from "@/utils/fetchWrapper";
import { Database } from "../../../types/supabase";
import { revalidatePath, revalidateTag } from "next/cache";

export type JournalEntry = Database["public"]["Tables"]["daily_journal"]["Row"];

const getTagForDate = (date: Date) =>
	`daily-journal-${date.toISOString().split("T")[0]}`;

export const getJournalEntries = async (
	date?: Date
): Promise<JournalEntry[] | undefined> => {
	try {
		const res = await fetchWrapper(
			`/api/daily_journal?${
				date !== undefined
					? `date=${date.toISOString().split("T")[0]}`
					: ""
			}`,
			{
				method: "GET",
				next: { tags: ["daily-journal"] },
			}
		);

		if (!res.ok) {
			throw new Error("Failed to fetch journal entries");
		}
		const data = await res.json();
		return data;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export const addJournalEntry = async (
	content: string
): Promise<JournalEntry[] | undefined> => {
	try {
		const res = await fetchWrapper(`/api/daily_journal`, {
			method: "POST",
			body: {
				content: content,
			},
		});

		if (!res.ok) {
			throw new Error("Failed to fetch journal entries");
		}
		const data = await res.json();
		revalidateTag(getTagForDate(new Date()));

		return data;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
