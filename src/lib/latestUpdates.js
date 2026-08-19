export async function fetchLatestUpdate() {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const response = await fetch(`${apiUrl}/latest-updates`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Latest updates fetch failed:", error);
    return [];
  }
}
