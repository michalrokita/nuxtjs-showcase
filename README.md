# Nuxt 3 Showcase App
This is a minimalistic contact booth app using:
- Nuxt 3
- Prisma
- PostgreSQL
- Tailwind
- tRPC

There is a lot of things that could be improved and optimized, however, this project's purpose is to demonstrate the possibility.

## Setup

1. Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

2. Setup DB:

a) Rename .env.example to .env

b) Set DATABASE_URL

c) Migrate DB (If you use db url from the .env.example, you can skip that that step)
```bash
npx prisma db push
```

3. Run application / prepare for deployment

## Development Server

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
