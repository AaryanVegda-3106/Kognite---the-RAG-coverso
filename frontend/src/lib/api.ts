const API_BASE = "http://localhost:8000/api";

export async function fetchSpaces() {
  const res = await fetch(`${API_BASE}/spaces/`);
  if (!res.ok) throw new Error("Failed to fetch spaces");
  return res.json();
}

export async function createSpace(name: string) {
  const res = await fetch(`${API_BASE}/spaces/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error("Failed to create space");
  return res.json();
}

export async function fetchMetrics() {
  const res = await fetch(`${API_BASE}/dashboard/metrics`);
  if (!res.ok) throw new Error("Failed to fetch metrics");
  return res.json();
}

export async function fetchSpaceDetails(spaceId: number) {
  const res = await fetch(`${API_BASE}/spaces/${spaceId}`);
  if (!res.ok) throw new Error("Failed to fetch space details");
  return res.json();
}
