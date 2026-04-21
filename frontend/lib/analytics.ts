type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const googleAdsConversionLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

function canTrack() {
  return typeof window !== "undefined" && typeof window.gtag === "function";
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (!canTrack()) return;
  window.gtag?.("event", eventName, params);
}

export function trackWaitlistSubmitted(source: string) {
  trackEvent("waitlist_submit", {
    source,
  });
  trackAdsConversion({
    source,
  });
}

export function trackPricingCtaClick(label: string) {
  trackEvent("pricing_cta_click", {
    label,
  });
}

export function trackAdsConversion(extraParams: EventParams = {}) {
  if (!googleAdsId || !googleAdsConversionLabel || !canTrack()) return;

  window.gtag?.("event", "conversion", {
    send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
    ...extraParams,
  });
}
