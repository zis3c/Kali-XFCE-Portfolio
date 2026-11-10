# Contributing

Thanks for taking a look at this project. Issues and pull requests are welcome.

## Setup

```bash
npm ci --legacy-peer-deps
cp .env.example .env.local
npm run dev
```

The app runs at `http://localhost:3000`. The demo password defaults to `1234`.

## Before opening a pull request

Run the same checks as CI:

```bash
npm run lint
npm run typecheck
npm run format:check
npm run test:coverage
npm run build
```

Keep pull requests focused. One fix or feature per pull request is easier to review than a bundle of unrelated changes.

## Commit style

This repository uses conventional commit prefixes such as `feat:`, `fix:`, `refactor:`, `test:`, `chore:`, and `docs:`. Keep the summary short and describe the user-facing effect.

## Tests

New behaviour needs a test. Bug fixes should include a regression test that fails before the fix. See `docs/TESTING.md` for the coverage policy and the test inventory.

## Security

Do not open a public issue for a vulnerability. Follow `SECURITY.md` instead.
