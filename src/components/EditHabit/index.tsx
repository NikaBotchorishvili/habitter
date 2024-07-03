import { createClient } from "@/utils/supabase/clients/server";
import { Database } from "../../../types/supabase";
import HabitForm from "../Dashboard/components/HabitForm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type Props = {
    habit: Database["public"]["Tables"]["habits"]["Row"];
}

const EditHabitSection: React.FC<Props> = ({ habit })=> {
    const handleEditHabit = async (habit_title: string) => {
        "use server";

        try {
            const supabase = await createClient();
            const { error } = await supabase
                .from("habits")
                .update({ title: habit_title })
                .eq("id", habit.id)
                .select()
            if (error) throw error;

            revalidateTag("habits")
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    return (
        <section className="max-w-md w-full">
            <h1 className="text-center">Edit Habit</h1>
            <HabitForm onSubmitHandler={handleEditHabit} initialValues={habit} />
        </section>
    );
}

export default EditHabitSection;
