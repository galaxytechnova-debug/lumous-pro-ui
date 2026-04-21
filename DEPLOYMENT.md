# Production Deployment Runbook

## 1) Deploy backend on Vercel

1. Create a new Vercel project with root directory `backend`.
2. Add environment variables:
   - `MONGODB_URI`
   - `FRONTEND_ORIGINS` (comma-separated frontend URLs, including production domain)
   - `NODE_ENV=production`
   - Optional connection tuning:
     - `MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000`
     - `MONGODB_CONNECT_TIMEOUT_MS=10000`
     - `MONGODB_SOCKET_TIMEOUT_MS=20000`
3. In MongoDB Atlas, allow network access for your deployment traffic (for Vercel this is commonly `0.0.0.0/0` with strong DB credentials), otherwise requests fail with server selection errors.
4. Deploy from your production branch.
5. Verify:
   - `GET /health` returns `ok: true` and `db.connected: true`.
   - `POST /api/v1/waitlist` works from an API client.

## 2) Deploy frontend on Vercel

1. Create a new Vercel project with root directory `frontend`.
2. Add environment variables:
   - `NEXT_PUBLIC_WAITLIST_API_URL` (backend production URL)
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - `NEXT_PUBLIC_GOOGLE_ADS_ID`
   - `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`
   - `NEXT_PUBLIC_SITE_URL` (your canonical domain, e.g. `https://yourdomain.com`)
3. Connect your custom domain in the project settings.
4. Deploy from your production branch.

## 3) Google Search publishing

1. Open [Google Search Console](https://search.google.com/search-console/about) and verify your domain property.
2. Submit sitemap:
   - `https://yourdomain.com/sitemap.xml`
3. Request indexing for core pages:
   - `/`
   - `/pricing`
   - `/components`
   - `/waitlist`

## 4) Google Ads and GA4 validation

1. Confirm GA4 page views in Realtime after visiting pages.
2. Trigger conversion actions (waitlist submit, pricing CTA clicks).
3. Validate tags/events with Tag Assistant and GA4 DebugView.
4. In Google Ads, link GA4 property and import conversion events if needed.

## 5) Post-launch checks

1. Frontend build succeeds (`npm run build` in `frontend`).
2. Verify:
   - `/robots.txt` is reachable
   - `/sitemap.xml` is reachable
3. Confirm no CORS errors from frontend to backend in production.
4. Monitor Vercel logs for first week for function errors and latency spikes.
