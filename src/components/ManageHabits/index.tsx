import React from "react";
import Calendar from "@/libs/Calendar";
import { CompleteAndIncompleteHabits } from "@/app/manage/actions";
import HabitList from "./components/List";

type Props = {
  habits: CompleteAndIncompleteHabits;
};

const ManageHabitsSection: React.FC<Props> = ({ habits }) => {
  return (
    <section className="flex flex-col items-center justify-center gap-y-16">
      <h1 className="text-3xl">Manage Habits</h1>
      <section className="flex flex-col items-center justify-center space-y-4">
        <article className="flex justify-center items-center flex-col gap-y-5">
          <h2 className="text-2xl font-bold">Today&apos;s habits</h2>
          <HabitList habits={habits} />
        </article>
        <Calendar />
      </section>
    </section>
  );
};

export default ManageHabitsSection;
