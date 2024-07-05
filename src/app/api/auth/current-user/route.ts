import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/clients/server';

export async function GET(request: NextRequest) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
}
