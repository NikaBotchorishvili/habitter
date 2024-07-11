import { PrivateRoute } from "@/components/common/PrivateRoute";
import Input from "@/components/common/ui/Input";
import XCenterContainer from "@/components/containers/XCenterContainer";
import JournalAddForm from "@/components/Journal/Form/AddForm";
import { getJournalEntries } from "./actions";
import { DailyJournalList } from "@/components/Journal/DailyJournalList";

const JournalPage = async () => {
	const entries = (await getJournalEntries()) || [];
	return (
		<PrivateRoute>
			<XCenterContainer>
				<section className="flex flex-col items-center justify-center gap-y-16">
					<h1 className="text-3xl font-bold tracking-wider dark:text-darkModePrimary text-lightModePrimary">
						Journal
					</h1>

					<JournalAddForm />

					<section>
						<DailyJournalList entries={entries} />
					</section>
				</section>
			</XCenterContainer>
		</PrivateRoute>
	);
};

export const dynamic = 'force-dynamic';
export default JournalPage;
