# Gather & Graze

A responsive catering discovery and event planning experience built with Next.js App Router, TypeScript and React.

The included caterers, prices, ratings, and locations are illustrative sample content, not live listings.

## Run locally

- Install Node.js 20.9 or newer.
- Run `pnpm install --ignore-scripts` and then `pnpm dev`.
- Open http://localhost:3000.

## Monolith integration

The UI calls one same-origin endpoint: `POST /api/inquiries`. The route handler validates the origin, payload size, event type, date format, and guest range before returning a demo acceptance. Replace the adapter response in `app/api/inquiries/route.ts` with the monolith's booking domain service, or call an internal service there using a server-only environment variable. Keep secrets out of `NEXT_PUBLIC_*` variables.

A natural modular-monolith mapping is:

- `catalog`: caterers, restaurants, dishes, packages, availability
- `events`: event briefs, guest counts, dates and selections
- `fulfillment`: cooks, servers, delivery and staffing
- `identity`: customer, partner and admin accounts
- `orders`: quotes, pricing, payments and order lifecycle

The HTTP boundary can grow into `/api/catalog`, `/api/events`, `/api/orders`, and `/api/partners` while the UI continues to use typed functions in `lib/api.ts`. Keep request schemas shared or generated from the backend contract. Add authenticated sessions, server-side authorization, rate limiting, CSRF protections for cookie-authenticated writes, database persistence, payment provider verification, and audit logging before accepting real bookings. The demo endpoint does not persist inquiries.

## Security and production notes

`next.config.ts` disables the framework signature and adds browser security headers. `proxy.ts` applies a per-request nonce CSP; the policy allows Google Fonts and Unsplash for this prototype. Move photos and fonts to an owned image host before production and configure HSTS at the HTTPS ingress. Frontend validation is for UX only: repeat all validation and authorization on the server. Add authentication and ownership checks before exposing private orders or partner data.
