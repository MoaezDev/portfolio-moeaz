# Portfolio — Muhammad Moaez Ahmad

Personal portfolio built with **Vite + React + TypeScript**, **styled-components**,
**Framer Motion**, **tsparticles**, and **react-tilt**. Dark navy theme with
electric-blue / violet accents, a glassmorphism navbar, animated typewriter,
3D tilt project cards, custom cursor, and scroll-triggered reveals.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **styled-components** with a typed theme (`src/styles/theme.ts`)
- **Framer Motion** — section reveals & spring animations
- **react-tsparticles** — hero particle background
- **react-tilt** — 3D project cards
- **react-icons** — social / UI icons
- **ESLint** (Airbnb + airbnb-typescript) + **Prettier**
- **Husky** + **lint-staged** — pre-commit linting

## Path aliases

Configured in [`tsconfig.json`](tsconfig.json) and resolved by `vite-tsconfig-paths`:

```
@assets/*      -> src/assets/*
@components/*  -> src/components/*
@sections/*    -> src/sections/*
@hooks/*       -> src/hooks/*
@constants/*   -> src/constants/*
@styles/*      -> src/styles/*
@utils/*       -> src/utils/*
```

## Folder structure

```
src/
├── assets/         # fonts, images, icons
├── components/     # reusable UI components
├── sections/       # page sections (Hero, About, Skills, Projects, Contact)
├── hooks/          # custom React hooks
├── constants/      # all content (data.ts)
├── styles/         # global styles + theme
└── utils/          # helper functions
```

All hardcoded content lives in [`src/constants/data.ts`](src/constants/data.ts).

## Scripts

```bash
yarn install     # install dependencies
yarn dev         # start Vite dev server on http://localhost:5173
yarn build       # type-check + production build
yarn preview     # preview the production build locally
yarn lint        # lint the src tree
yarn lint:fix    # lint with auto-fix
yarn typecheck   # tsc --noEmit
```

## Husky pre-commit hook

After the first install, Yarn runs the `prepare` script which initialises Husky.
The pre-commit hook is at [`.husky/pre-commit`](.husky/pre-commit) and runs
`yarn lint-staged`, which lints only the staged `.ts` / `.tsx` files defined in
[`package.json`](package.json#L34-L38).

If the hook does not fire after `git init`, run:

```bash
yarn husky install
chmod +x .husky/pre-commit
```

## Customise

- **Personal details, projects, skills:** edit [`src/constants/data.ts`](src/constants/data.ts)
- **Colours & spacing:** edit [`src/styles/theme.ts`](src/styles/theme.ts)
- **Roles in the typewriter:** `ROLE_TYPEWRITER` in `data.ts`
- **Social links:** `PERSONAL.linkedin` and `PERSONAL.github` in `data.ts`

### Profile photo

Drop your photo at [`public/profile.jpg`](public/profile.jpg). Anything in
`public/` is served from the site root, so the file is referenced as
`/profile.jpg` (already wired through `PERSONAL.avatarUrl` in
[`data.ts`](src/constants/data.ts)).

- Recommended: square crop, 600 × 600 or larger, JPG or PNG.
- If the file is missing or fails to load, the badge silently falls
  back to the gradient initials defined by `PERSONAL.initials`.
# portfolio-moeaz
