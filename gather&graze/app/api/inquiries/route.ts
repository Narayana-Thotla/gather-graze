import { NextRequest, NextResponse } from "next/server";

const eventTypes = new Set(["wedding", "birthday", "corporate", "house-party", "kitty-party", "other"]);

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 16_000) return NextResponse.json({ error: "Request is too large." }, { status: 413 });
    payload = JSON.parse(raw);
  }
  catch { return NextResponse.json({ error: "Send a valid JSON request." }, { status: 400 }); }

  if (!payload || typeof payload !== "object") return NextResponse.json({ error: "Invalid inquiry." }, { status: 400 });
  const body = payload as Record<string, unknown>;
  const guests = Number(body.guests);
  const eventType = typeof body.eventType === "string" ? body.eventType : "";
  const date = typeof body.date === "string" ? body.date : "";
  const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00.000Z`) : null;
  const validDate = parsedDate && !Number.isNaN(parsedDate.valueOf()) && parsedDate.toISOString().slice(0, 10) === date;
  const services = body.services;
  if (!eventTypes.has(eventType) || !Number.isInteger(guests) || guests < 2 || guests > 10_000 || !validDate || !Array.isArray(services) || services.length > 30 || services.some((service) => typeof service !== "string" || service.length > 120)) {
    return NextResponse.json({ error: "Choose an event, a valid date and 2–10,000 guests." }, { status: 422 });
  }

  // Replace this adapter response with a call to the monolith's booking domain service.
  return NextResponse.json({ ok: true, inquiryId: `demo-${crypto.randomUUID()}`, message: "Your event brief is ready. A caterer can follow up once bookings are connected." }, { status: 202 });
}
