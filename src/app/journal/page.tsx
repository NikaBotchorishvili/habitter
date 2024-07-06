import { PrivateRoute } from "@/components/common/PrivateRoute";
import Input from "@/components/common/ui/Input";
import XCenterContainer from "@/components/containers/XCenterContainer";
import { JournalForm } from "@/components/Journal/Form";

const JournalPage = () => {
    return (
        <PrivateRoute>
            <XCenterContainer>
                <section  className="flex flex-col items-center justify-center gap-y-16">
                    <h1 className="text-3xl font-bold tracking-wider dark:text-darkModePrimary text-lightModePrimary">Journal</h1>

                    <JournalForm/>
                </section>
            </XCenterContainer>
        </PrivateRoute>
    );
}
 
export default JournalPage;