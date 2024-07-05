"use client"
import { Database } from "../../../../types/supabase";
import List from "@/components/common/ui/List";
import { handleReOrderParams } from "../../../../types/general";
import { createClient } from "@/utils/supabase/clients/server";
import { useState } from "react";
import { reOrderHabits } from "@/app/actions";

type Props = {
	habits: Database["public"]["Tables"]["habits"]["Row"][];
};
type Fields = keyof Database["public"]["Tables"]["habits"]["Row"];

const HabitsList: React.FC<Props> = ({ habits }) => {
	const handleReOrder = async ({
		item_one_id,
		item_two_id,
	}: handleReOrderParams) => {
		try{
            const response = await reOrderHabits({item_one_id, item_two_id});
        }catch(error){
            console.error(error);
        }

	};
	return (
		<List
			handleReOrder={handleReOrder}
			items={habits}
			fields={["title"] as Fields[]}
			keyPrefix="habit"
			titleField="title"
			del={true}
			edit={true}
		/>
	);
};

export default HabitsList;
