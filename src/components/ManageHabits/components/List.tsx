"use client";
import React, { startTransition, useState, useOptimistic } from "react";
import {
	CompleteAndIncompleteHabits,
	CompleteHabit,
	Habit,
	IncompleteHabit,
} from "@/app/manage/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropList from "./Drop/DropList";
import JournalModal from "../JournalModal";

type Props = {
	habits: CompleteAndIncompleteHabits;
};

const HabitList: React.FC<Props> = ({ habits }) => {
	const [localData, setLocalData] =
		useOptimistic<CompleteAndIncompleteHabits>(habits);
	const [journalToggled, setJournalToggled] = useState(false);

	const handleIncompleteToComplete = async (id: string) => {
		try {
			setJournalToggled(true);
			const response = await CompleteHabit(id);
			startTransition(() => {
				setLocalData((state) => {
					const habitToMove = state.incompleteHabits.find(
						(habit) => habit.id === id
					);
					if (!habitToMove) return state;

					const updatedHabit = {
						...habitToMove,
						habit_id: id,
					};

					return {
						...state,
						incompleteHabits: state.incompleteHabits.filter(
							(habit) => habit.id !== id
						),
						completedHabits: [
							...state.completedHabits,
							updatedHabit,
						],
					};
				});
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleCompleteToIncomplete = async (id: string) => {
		startTransition(async () => {
			try {
				setLocalData((state) => {
					const habitToMove = state.completedHabits.find(
						(habit) => habit.id === id
					);

					if (!habitToMove) return state;

					const updatedHabit = {
						...habitToMove,
						id: habitToMove.id!,
						ordering: null,
						title: "", // or some default title if necessary
						user_id: null,
					};

					return {
						...state,
						incompleteHabits: [
							...state.incompleteHabits,
							updatedHabit,
						],
						completedHabits: state.completedHabits.filter(
							(habit) => habit.id !== id
						),
					};
				});

				const response = await IncompleteHabit(id);
			} catch (error) {
				console.error(error);
			}
		});
	};

	return (
		<div className="flex gap-10 relative">
			<DndProvider backend={HTML5Backend}>
				<div className="space-y-4">
					<h1 className="text-2xl font-bold">In progress</h1>
					<DropList
						type="incomplete"
						accept="completed"
						handleFunction={handleCompleteToIncomplete}
						habits={localData.incompleteHabits}
					/>
				</div>
				<div className="relative space-y-4">
					{journalToggled && (
						<JournalModal
							onClose={() => setJournalToggled(false)}
						/>
					)}
					<h1 className="text-2xl font-bold">Completed</h1>
					<DropList
						type="completed"
						accept="incomplete"
						handleFunction={handleIncompleteToComplete}
						habits={localData.completedHabits}
					/>
				</div>
			</DndProvider>
		</div>
	);
};

export default HabitList;
