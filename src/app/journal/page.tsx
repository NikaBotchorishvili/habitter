import { PrivateRoute } from "@/components/common/PrivateRoute";
import XCenterContainer from "@/components/containers/XCenterContainer";

const JournalPage = () => {
    return (
        <PrivateRoute>
            <XCenterContainer>
                <>Journal</>
            </XCenterContainer>
        </PrivateRoute>
    );
}
 
export default JournalPage;