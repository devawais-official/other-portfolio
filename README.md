# Muhammad Awais — Mobile Portfolio

A fully responsive, animated, SEO-friendly portfolio for a Senior Kotlin Multiplatform (KMP) / Android developer, built with Next.js (App Router), TypeScript and Tailwind CSS.

## Stack

- **Next.js 14** (App Router, static generation, `generateMetadata`, `sitemap.ts`, `robots.ts`)
- **TypeScript**
- **Tailwind CSS** with a custom design token system
- **Framer Motion** for page-load sequences, scroll reveals, and shared-layout nav transitions
- **Resend** for real contact-form email delivery via a Next.js Route Handler
- **lucide-react** for icons

## Pages

- `/` — Home (hero, tech marquee, featured projects, process, testimonials)
- `/about` — Bio, principles, timeline, achievements
- `/services` — KMP development, Android TV, and AI mobile systems services
- `/projects` — Filterable project grid + `/projects/[slug]` detail pages
- `/case-studies` — In-depth case studies + `/case-studies/[slug]` detail pages
- `/blog` — Articles + `/blog/[slug]` detail pages
- `/testimonials` — Client feedback grid
- `/contact` — Contact form that sends a real email via Resend

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`.

## Setting up the contact form's email delivery

The contact form posts to `app/api/contact/route.ts`, which sends email through [Resend](https://resend.com):

1. **Sign up at [resend.com](https://resend.com)** (free tier covers a portfolio's volume — 3,000 emails/month, 100/day).
2. **Create an API key** in the Resend dashboard → API Keys → Create API Key.
3. Add it to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=mughal963@gmail.com
   CONTACT_FROM_EMAIL=onboarding@resend.dev
   ```
4. **For production**, verify your own domain in Resend (Domains → Add Domain, then add the DNS records it gives you). Once verified, change `CONTACT_FROM_EMAIL` to something like `contact@devawais.com` — this avoids landing in spam and lets you send from your own domain instead of the shared `resend.dev` testing address.
5. **On Vercel** (or your host), add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as environment variables in the project settings — `.env.local` is not deployed.

What the route handler does:

- Validates name, email, and message server-side (never trusts the client).
- Rate-limits to 5 submissions per IP per 10 minutes (in-memory — resets on redeploy, which is fine at portfolio scale).
- Includes a hidden honeypot field (`company`) that silently discards bot submissions filling every input.
- Sends you a formatted inquiry email with `replyTo` set to the sender, so you can hit "Reply" directly.
- Sends the visitor a best-effort confirmation email (failure here doesn't fail their submission).

If you'd rather use your own SMTP/Gmail account instead of Resend, swap the `resend.emails.send(...)` calls in `app/api/contact/route.ts` for `nodemailer` with your SMTP credentials — the validation, rate-limiting, and honeypot logic around it stay the same.

## Editing content

All copy lives in `lib/data/*.ts` and `lib/siteConfig.ts` — no content is hardcoded into components.

- `lib/siteConfig.ts` — name, tagline, contact info, social links, SEO metadata, achievements, tech arsenal
- `lib/data/projects.ts` — project grid + detail pages (9 real projects)
- `lib/data/services.ts` — services offered
- `lib/data/caseStudies.ts` — 3 case studies grounded in real achievements
- `lib/data/blogPosts.ts` — blog grid + detail pages
- `lib/data/testimonials.ts` — real client testimonials

### Project images

`lib/data/projects.ts` currently references projects by name only (no images) since no screenshot assets were supplied. If you want to add real screenshots or app icons:

1. Drop images into `public/images/projects/` (e.g. `spectra-care.webp`).
2. Add an `image` field to the relevant project in `lib/data/projects.ts`.
3. Render it in `components/ProjectCard.tsx` and `app/projects/[slug]/page.tsx` with `next/image`.

## Design system

Defined in `tailwind.config.ts` and `app/globals.css`:

- **Colors**: near-black `bg` (#090B14), violet `primary` (#6E56FF), coral `accent` (#FF7A59), mint (#34D399)
- **Type**: Space Grotesk (display), Inter (body), JetBrains Mono (labels/data — a nod to the Kotlin/JetBrains ecosystem)
- **Signature element**: `components/HeroComposeStack.tsx` — layered panels (Android Native / Compose Multiplatform / Kotlin Multiplatform) animate together into a single phone frame on load

## Deploying

Standard Next.js app — deploy to Vercel, Netlify, or any Node host:

```bash
npm run build
npm run start
```

Remember to set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as environment variables on your host before the contact form will send real email.
