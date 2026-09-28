export type InquiryInput = { eventType: string; guests: number; date: string; services: string[] };
export type InquiryResult = { ok: true; inquiryId: string; message: string };

/** Same-origin BFF boundary. Point the route handler at the monolith's booking module when ready. */
export async function createInquiry(input: InquiryInput): Promise<InquiryResult> {
  const response = await fetch("/api/inquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(typeof result.error === "string" ? result.error : "Couldn't send your event brief.");
  return result as InquiryResult;
}
