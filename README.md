# Deal Driver

Deal Driver is a state-first U.S. new-vehicle promotions platform. It helps users select a state, choose any new vehicle sold in the United States, and compare advertised lease and finance promotions against official manufacturer benchmarks.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Framer Motion-ready UI layer
- Recharts
- PostgreSQL and Prisma
- Auth.js/NextAuth-ready data model
- Transactional email architecture for Resend, SendGrid, Mailgun, or SES

## MVP Surfaces

- `/` landing page
- `/promotions` state-first promotion selector
- `/promotions/[state]/[make]/[model]` statewide model promotion results
- `/promotions/[state]/[make]/[model]/[trim]` trim-level statewide promotion results
- `/deals` deal listings
- `/vehicles` U.S. new-vehicle catalog
- `/deal/[id]` individual deal detail page
- `/dashboard`, `/dashboard/inbox`, `/dashboard/campaigns`, `/dashboard/favorites`, `/dashboard/alerts`

## Data and Compliance

Vehicle, manufacturer promotion, dealer promotion, market pricing, stock photo, community, and optional CarGurus-style reference data are abstracted behind service files. CarGurus support is optional and contains no scraping logic; it is designed for approved APIs, licensed feeds, manually imported records, or other compliant sources.

Community intelligence is designed for compliant ingestion only: public APIs where allowed, user-submitted links, permitted RSS feeds, partnerships, or manual imports. Forum data is represented as a placeholder ingestion service with source links, timestamps, parsed fields, and confidence scoring.

Deals may change without notice. Community-reported deals are not guaranteed. Deal Driver is not a lender or dealer.

## Development

```bash
npm install
npm run dev
```

Set `DATABASE_URL` before running Prisma migrations or seed scripts.
