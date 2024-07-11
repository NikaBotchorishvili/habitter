"use client";
import { CompleteAndIncompleteHabits } from "@/app/manage/actions";
import React, {
	createContext,
	useState,
	ReactNode,
	useContext,
	useOptimistic,
	useEffect,
} from "react";

type JournalContextType = {
	journalToggled: boolean;
	completedHabitId: string | null;
	setJournalToggled: (value: boolean) => void;
	setCompletedHabitId: (id: string | null) => void;
	localData: CompleteAndIncompleteHabits;
	setLocalData: React.Dispatch<
		React.SetStateAction<CompleteAndIncompleteHabits>
	>;
};

export const JournalContext = createContext<JournalContextType | undefined>(
	undefined
);

type ContextProps = {
	children: ReactNode;
};

export const JournalProvider = ({ children }: ContextProps) => {
	const [journalToggled, setJournalToggled] = useState(false);
	const [completedHabitId, setCompletedHabitId] = useState<string | null>(
		null
	);
	const [localData, setLocalData] = useState<CompleteAndIncompleteHabits>({
		completedHabits: [],
		incompleteHabits: [],
	});
	return (
		<JournalContext.Provider
			value={{
				journalToggled,
				completedHabitId,
				setJournalToggled,
				setCompletedHabitId,
				localData,
				setLocalData,
			}}
		>
			{children}
		</JournalContext.Provider>
	);
};

export const useJournalContext = () => {
	const context = useContext(JournalContext);
	if (context === undefined) {
		throw new Error(
			"useJournalContext must be used within a JournalProvider"
		);
	}
	return context;
};
