"use client";
import React, { startTransition, useEffect } from "react";
import {
	CompleteAndIncompleteHabits,
	CompleteHabit,
	IncompleteHabit,
} from "@/app/manage/actions";
import { DndProvider } from "react-dnd";
import DropList from "./Drop/DropList";
import JournalModal from "../JournalModal";
import HTML5toTouch from "./HTML5ToTouchBackend";
import { MultiBackend } from "dnd-multi-backend";
import { useJournalContext } from "../context/JournalContext";

type Props = {
	habits: CompleteAndIncompleteHabits;
};

const HabitList: React.FC<Props> = ({ habits }) => {
	const {
		completedHabitId,
		journalToggled,
		setCompletedHabitId,
		setJournalToggled,
		setLocalData,
		localData,
	} = useJournalContext();
	
	useEffect(() => {
		startTransition(() => {
			setLocalData(habits);
		});
	}, [habits]);

	const handleIncompleteToComplete = async (id: string) => {
		try {
			setCompletedHabitId(id);
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
		console.log("hello")
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
						title: habitToMove.title, // or some default title if necessary
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

	const handleModalClose = () => {
		setJournalToggled(false);
		setCompletedHabitId(null);
	};
	return (
		<>
			{journalToggled && (
				<JournalModal
					onClose={handleModalClose}
					completedHabitId={completedHabitId}
				/>
			)}
			<div className="flex gap-10 relative">
				<DndProvider backend={MultiBackend} options={HTML5toTouch}>
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
		</>
	);
};

export default HabitList;
