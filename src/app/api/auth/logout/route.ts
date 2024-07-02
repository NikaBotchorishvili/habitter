import { createClient } from "@/libs/supabase/clients/server"
import { NextRequest, NextResponse } from "next/server"


export const POST = async(req: NextRequest) => {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if(error){
        return NextResponse.json({error: error.message}, {status: 401})
    }


    return NextResponse.json({message: "Logout successful"}, {status: 200})
}