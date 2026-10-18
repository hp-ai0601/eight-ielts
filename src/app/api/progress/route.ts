import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { checkPin, USERS } from "@/lib/users";

const FILE = path.join(process.cwd(), "data", "progress.json");

async function readAll(): Promise<Record<string, unknown>> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

async function writeAll(data: Record<string, unknown>) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const user = url.searchParams.get("user");
  const pin = url.searchParams.get("pin") || "";
  const all = await readAll();
  if (!user) {
    return NextResponse.json({
      users: USERS.map((u) => ({ id: u.id, name: u.name, role: u.role })),
      saved: Object.keys(all),
    });
  }
  if (user === "zang" || checkPin("hiep", pin) || checkPin(user, pin)) {
    return NextResponse.json({ user, state: all[user] ?? null });
  }
  return NextResponse.json({ error: "pin" }, { status: 401 });
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { userId?: string; pin?: string; state?: unknown };
    if (!body.userId || !body.state) return NextResponse.json({ ok: false }, { status: 400 });
    const all = await readAll();
    all[body.userId] = { at: Date.now(), state: body.state };
    await writeAll(all);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, disk: "readonly" }, { status: 200 });
  }
}
