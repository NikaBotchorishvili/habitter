import { createClient } from "@/utils/supabase/clients/server";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params: { id: completed_id }}: {params: {id: string}} 
) {
    try{
        const supabase = await createClient();
    
        const { data, error } = await supabase
            .from("completed_habits")
            .delete()
            .eq("habit_id", completed_id)
        
        if(error){
            return NextResponse.json({ error: "Error fetching habit" }, { status: 500 });
        }
        
        
        return NextResponse.json({ "message": "Success" }, { status: 200 });
    
    }catch(e){
        return NextResponse.json({ error: "Error fetching habit" }, { status: 500 });
    }
}
