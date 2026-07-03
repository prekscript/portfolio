# Preksha Chawla — VSCode Portfolio

A fully functional VSCode-inspired portfolio. Looks and feels like an IDE — sidebar file tree, tabs, terminal, status bar, activity bar, breadcrumbs, and line numbers.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## File structure

```
app/
  layout.tsx                   — root layout, loads Fira Code & Inter fonts
  globals.css                  — complete VSCode dark theme design system
  page.tsx                     — IDE shell (tabs, sidebar, terminal, status bar)
  components/
    views/
      HomeView.tsx             — hero rendered as JSX
      AboutView.tsx            — philosophy as TypeScript object
      ProjectsView.tsx         — project cards (GuardianOS, Hush, Parable, Talent Match AI)
      ExperienceView.tsx       — timeline (Navodita, Incite Gravity, Zvia Tech, Tinashe)
      SkillsView.tsx           — skill pills by category
      ContactView.tsx          — all contact links
```

## Customise

- **Colors**: edit `:root` variables in `globals.css`
- **Projects**: edit the `projects` array in `ProjectsView.tsx`
- **Experience**: edit the `experience` array in `ExperienceView.tsx`
- **Terminal boot lines**: edit `TERMINAL_BOOT` array in `page.tsx`

## Deploy

**Vercel (one click)**
```bash
npm i -g vercel && vercel
```

or push to GitHub and import at https://vercel.com/new — it auto-detects Next.js.
