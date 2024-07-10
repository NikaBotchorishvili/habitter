import { Database } from "./supabase";
export type handleReOrderParams = {
    item_one_id: string;
    item_two_id: string;
}
export interface FormattedHabit {
    id: string;
    created_at: string;
    habit_id: string | null;
    title: string;
  }
export type CompletedHabit = Database["public"]["Tables"]["completed_habits"]["Row"]