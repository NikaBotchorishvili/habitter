import { DragEndEvent } from "@dnd-kit/core";
import { Database } from "../../../../types/supabase";
import List from "@/components/common/ui/List";
import { handleReOrderParams } from "../../../../types/general";
import { createClient } from "@/utils/supabase/clients/server";

type Props = {
	habits: Database["public"]["Tables"]["habits"]["Row"][];
};
type Fields = keyof Database["public"]["Tables"]["habits"]["Row"];

const HabitsList: React.FC<Props> = ({ habits }) => {
	const handleReOrder = async ({
		item_one_id,
		item_two_id,
	}: handleReOrderParams) => {
		"use server";
		try {
			const supabase = await createClient();

			const { data: item_one, error: item_one_error } = await supabase
				.from("habits")
				.select("*")
				.eq("id", item_one_id)
				.maybeSingle();
			const { data: item_two, error: item_two_error } = await supabase
				.from("habits")
				.select("*")
				.eq("id", item_two_id)
				.maybeSingle();

			if (item_one_error || item_two_error)
				throw item_one_error || item_two_error;

			if (!item_one || !item_two) throw new Error("Item not found");

            const { error: update_one_error } = await supabase
                .from("habits")
                .update({ ordering: item_two.ordering })
                .eq("id", item_one_id);
            if (update_one_error) throw update_one_error;

            const { error: update_two_error } = await supabase
                .from("habits")
                .update({ ordering: item_one.ordering })
                .eq("id", item_two_id);

            if (update_two_error) throw update_two_error;


		} catch (error) {
			console.error("Reordering error:", error);
		}
	};

	return (
		<List
			handleReOrder={handleReOrder}
			items={habits}
			fields={["id", "title"] as Fields[]}
			keyPrefix="habit"
			titleField="title"
			del={true}
			edit={true}
		/>
	);
};

export default HabitsList;
