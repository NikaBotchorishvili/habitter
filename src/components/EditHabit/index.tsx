import { createClient } from "@/utils/supabase/clients/server";
import { Database } from "../../../types/supabase";
import HabitForm from "../Dashboard/components/HabitForm";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { updateHabit } from "@/app/actions";

type Props = {
    habit: Database["public"]["Tables"]["habits"]["Row"];
}

const EditHabitSection: React.FC<Props> = ({ habit })=> {


    return (
        <section className="max-w-md w-full">
            <h1 className="text-center">Edit Habit</h1>
            <HabitForm successToastMessage={`Habit ${habit.title} edited successfully`} onSubmitHandler={updateHabit} initialValues={habit} />
        </section>
    );
}

export default EditHabitSection;
