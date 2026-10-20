/** Shared progress store. Public anon key is intentional (PIN app, RLS open on this table). */

const REST = "https://jnntfzkmgqokpwscqzsj.supabase.co/rest/v1/progress";
const KEY = "sb_publishable_Mm7nwgdAb2d8Fh10W8-xrA_E7pcv1W1";

export type DocId = "zang" | "grade";

function headers(prefer = "return=representation"): HeadersInit {
  return {
    apikey: KEY,
    Authorization: `Bearer ${KEY}`,
    "Content-Type": "application/json",
    Prefer: prefer,
  };
}

export async function dbGet<T>(id: DocId): Promise<T | null> {
  const res = await fetch(`${REST}?id=eq.${id}&select=payload`, { headers: headers("return=representation") });
  if (!res.ok) return null;
  const rows = (await res.json()) as { payload: T }[];
  return rows[0]?.payload ?? null;
}

export async function dbPut(id: DocId, payload: unknown) {
  const body = JSON.stringify({ payload, updated_at: new Date().toISOString() });
  const res = await fetch(`${REST}?id=eq.${id}`, { method: "PATCH", headers: headers(), body });
  if (!res.ok) throw new Error(`db ${res.status}`);
  const rows = (await res.json()) as unknown[];
  if (rows.length) return;
  const created = await fetch(REST, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ id, payload, updated_at: new Date().toISOString() }),
  });
  if (!created.ok) throw new Error(`db ${created.status}`);
}
