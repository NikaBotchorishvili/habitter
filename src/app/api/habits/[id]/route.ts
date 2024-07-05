import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
	request: NextRequest,
	{ params }: {params: { id: string }}
): Promise<NextResponse> => {
    try{
        const supabase = await createClient();
        const { habit_title } = await request.json();

        if(!habit_title || habit_title.trim() === ""){
            return NextResponse.json({error: "Habit title is required"}, {status: 400});
        }
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();
    
        if (userError || !user) {
            console.error("Error fetching user:", userError);
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }
    
        const { data, error } = await supabase
            .from("habits")
            .update({ title: habit_title })
            .eq("id", params.id);
    
        if (error) {
            console.error("Error updating habit:", error);
            return NextResponse.json(
                { error: "Error updating habit" },
                { status: 500 }
            );
        }
    
        return NextResponse.json({ data }, { status: 200 });

    }catch(error){
        return NextResponse.json({error: "Error updating habit"}, {status: 500});
    }
};
