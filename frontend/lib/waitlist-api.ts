export interface WaitlistRequestPayload {
  name: string;
  email: string;
  projectType?: string;
  source?: string;
}

interface WaitlistApiResponse {
  ok: boolean;
  message: string;
  duplicate?: boolean;
}

const WAITLIST_API_URL =
  process.env.NEXT_PUBLIC_WAITLIST_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

export async function submitWaitlist(payload: WaitlistRequestPayload): Promise<WaitlistApiResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`${WAITLIST_API_URL}/api/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const data = (await response.json().catch(() => null)) as WaitlistApiResponse | null;
    if (!response.ok) {
      throw new Error(data?.message || "Failed to join waitlist.");
    }

    return data || { ok: true, message: "You have been added to the waitlist." };
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
