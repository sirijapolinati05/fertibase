import supabase from "./supabaseClient";

export async function fetchLatestUpdate() {
  const { data, error } = await supabase
    .from("latest_updates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}
