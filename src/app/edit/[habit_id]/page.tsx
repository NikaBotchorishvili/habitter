import { getHabitById } from "@/app/actions";
import HabitForm from "@/components/Dashboard/components/HabitForm";
import EditHabitSection from "@/components/EditHabit";
import { PrivateRoute } from "@/components/common/PrivateRoute";
import XCenterContainer from "@/components/containers/XCenterContainer";
import {redirect} from "next/navigation";
type Props = {
    params: {
        habit_id: string;
    }
}

const EditHabitPage: React.FC<Props> = async({ params: { habit_id } }) => {

    const habit = await getHabitById(habit_id);

    if (!habit) {
        redirect(''); 
    }

    return (
        <PrivateRoute>
        <XCenterContainer>
            <EditHabitSection habit={habit} />

        </XCenterContainer>


        </PrivateRoute>
    );
}
 
export default EditHabitPage;
