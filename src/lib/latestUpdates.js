import supabase from "./supabaseClient";

export async function fetchLatestUpdate() {
  const { data, error } = await supabase
    .from("latest_updates")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false }); // latest first

  if (error) {
    console.error("Latest updates fetch failed:", error);
    return [];
  }

  return data || [];
}
