'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID

export function GoogleAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (!measurementId || typeof window.gtag !== 'function') return

    const url = `${pathname}${window.location.search}`

    window.gtag('config', measurementId, {
      page_path: url,
    })
  }, [pathname])

  if (!measurementId) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', { page_path: window.location.pathname + window.location.search });
          ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}
        `}
      </Script>
    </>
  )
}
