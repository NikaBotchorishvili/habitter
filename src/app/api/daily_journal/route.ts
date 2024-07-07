import { createClient } from "@/utils/supabase/clients/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

const getTagForDate = (date: Date) =>
  `daily-journal-${date.toISOString().split("T")[0]}`;

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dateParam = searchParams.get("date");

    const supabase = await createClient();
    let date;

    if (dateParam) {
      const decodedDateStr = decodeURIComponent(dateParam);
      date = new Date(decodedDateStr);
    } else {
      date = new Date();
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    let query = supabase
      .from("daily_journal")
      .select("*")
      .eq("user_id", user.id)
      .gte(
        "entry_datetime",
        `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`
      )
      .lt(
        "entry_datetime",
        `${year}-${month.toString().padStart(2, "0")}-${(day + 1)
          .toString()
          .padStart(2, "0")}`
      );

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { content } = await req.json();

    if (!content || content.trim() === "") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return NextResponse.json(
        { error: userError.message },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const { data, error } = await supabase
      .from("daily_journal")
      .insert({ user_id: user.id, content: content })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const date = new Date(data.entry_datetime);

    // Revalidate tag for the specific date
    console.log(`Revalidating tag: ${getTagForDate(date)}`);
    await revalidateTag(getTagForDate(date));

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
};
