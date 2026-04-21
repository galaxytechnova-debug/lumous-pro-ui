/** Persists “template manager” UI (Select / Add) after unlock. Client-side only — not a security control. */
export const TEMPLATES_GATE_STORAGE_KEY = "lumosui-templates-gate-v1";

export const TEMPLATES_GATE_UNLOCKED_EVENT = "lumosui:templates-gate-unlocked";

export function isTemplatesGateUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem(TEMPLATES_GATE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function unlockTemplatesGate(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TEMPLATES_GATE_STORAGE_KEY, "1");
    window.dispatchEvent(new CustomEvent(TEMPLATES_GATE_UNLOCKED_EVENT));
  } catch {
    /* ignore quota / private mode */
  }
}

export function templatesGatePasswordMatches(input: string): boolean {
  return input.trim() === "Galaxy@12";
}
