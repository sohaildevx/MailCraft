# MailCraft

AI-powered email generator. Describe your goal, pick a tone, and get a polished, send-ready email in seconds.

## Tech Stack

- **Framework:** Next.js 16
- **UI:** shadcn/ui, Tailwind CSS
- **Animation:** Framer Motion
- **Font:** JetBrains Mono
- **Auth:** Supabase (email/password)
- **AI:** OpenAI GPT-4o-mini
- **Database:** Supabase PostgreSQL

## Features

- AI email generation with customizable tone and type
- Sign in / Sign up with Supabase auth
- Job-focused email fields (company, role, job description, context)
- Copy subject, body, or entire email with one click
- Mobile responsive with compose/preview tab toggle
- Dark landing page + light dashboard UI

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/mailcraft.git
cd mailcraft

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
```

Edit `.env.local` with your keys:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase/schema.sql` in the SQL Editor
3. Disable email confirmation: Authentication → Providers → Email → Uncheck "Confirm email"
4. Copy your project URL and anon key to `.env.local`

## Deploy

### Vercel (easiest)

```bash
npx vercel
```

### Cloudflare Pages

1. Push to GitHub
2. Connect repo in Cloudflare Dashboard → Workers & Pages
3. Build command: `npm run build`
4. Add env vars in Settings → Environment variables
5. Deploy

## Project Structure

```
mailcraft/
├── app/
│   ├── (auth)/          # Sign-in, Sign-up pages
│   ├── api/             # API routes
│   │   └── generate-email/
│   ├── dashboard/       # Main dashboard
│   └── page.tsx         # Landing page
├── components/          # UI components
├── lib/
│   ├── actions/         # Server actions (auth)
│   └── supabase/        # Supabase client setup
├── public/              # Static assets
└── supabase/
    └── schema.sql       # Database schema
```

## License

[MIT](LICENSE)
