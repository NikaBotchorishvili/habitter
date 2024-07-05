"use client";
import React, { useEffect, useOptimistic } from "react";
import {
	CompleteAndIncompleteHabits,
	CompleteHabit,
	IncompleteHabit,
} from "@/app/manage/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropList from "./Drop/DropList";
import { revalidatePath } from "next/cache";
import { Database } from "../../../../types/supabase";

type Props = {
	habits: CompleteAndIncompleteHabits;
};

const HabitList: React.FC<Props> = ({ habits }) => {
	const [localData, setLocalData] =
		useOptimistic<CompleteAndIncompleteHabits>(habits);
	console.log(habits);
	const handleIncompleteToComplete = async (id: string) => {
		try {
			setLocalData((state) => {
				const habitToMove = state.incompleteHabits.find(
					(habit) => habit.id === id
				);
				if (!habitToMove) return state;

				return {
					...state,
					incompleteHabits: state.incompleteHabits.filter(
						(habit) => habit.id !== id
					),
					completedHabits: [
						...state.completedHabits,
						habitToMove,
					].filter(
						(habit): habit is NonNullable<typeof habit> =>
							habit !== undefined
					),
				};
			});
			const response = await CompleteHabit(id);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCompleteToIncomplete = async (id: string) => {
		try {
			setLocalData((state) => {
				const habitToMove = state.completedHabits.find(
					(habit) => habit.id === id
				);

				if (!habitToMove) return state;
				
				return {
					...state,
					incompleteHabits: [
						...state.incompleteHabits,
						habitToMove
					],
					completedHabits: [
						...state.completedHabits.filter(
							(habit) => habit.id !== id
						),
					],
				};
			});
			const response = await IncompleteHabit(id);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex gap-10">
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
				<div className="space-y-4">
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
