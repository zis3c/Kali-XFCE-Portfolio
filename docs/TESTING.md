# Testing and quality gates

Strict setup for the Kali XFCE Portfolio. Every gate below runs locally and in
GitHub Actions.

## Commands

| Command                 | What it checks                                        |
| ----------------------- | ----------------------------------------------------- |
| `npm test`              | Jest unit and component tests                         |
| `npm run test:coverage` | Tests plus coverage thresholds                        |
| `npm run lint`          | ESLint over all TypeScript files, zero warnings       |
| `npm run typecheck`     | TypeScript with `strict: true`, no emit               |
| `npm run format:check`  | Prettier formatting                                   |
| `npm run audit`         | Production dependency vulnerabilities (high/critical) |
| `npm run build`         | Next.js production build                              |

## Coverage policy

Jest collects coverage from application code only. Styles, stories, type
declarations, generated files, and framework bootstraps (`_app`, `_document`,
`404`, `500`) are excluded because they contain no testable logic.

Current global thresholds in `jest.config.js`:

- statements: 80%
- lines: 80%
- functions: 80%
- branches: 60%

The thresholds are deliberately just below the measured baseline so a real
regression fails CI, while small refactors do not.

## Test inventory

| Area       | Suites | Focus                                                                         |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| API routes | 3      | contact form validation, CORS, rate limiting, health endpoint                 |
| Backend    | 3      | Mongo connection helpers, SendGrid controller, Contact model                  |
| Middleware | 5      | error mapping, correlation IDs, security headers, rate limiting               |
| Redux      | 10     | reducers and action creators (news, contact, UI, windows, todos)              |
| Utilities  | 13     | filesystem, retry, logging, env, API features, notifications                  |
| Hooks      | 7      | hover, outside click, mouse coordinates, reduced motion, observer             |
| Components | 65+    | boot, login, desktop, taskbar, terminal, file manager, editor, portfolio mode |
| Pages      | 4      | home flow, error page, health, contact                                        |

Run a single suite with `npx jest <path>`.

## Security policy

`npm run audit` fails on unapproved high or critical production
vulnerabilities. `audit-allowlist.json` holds temporary exceptions with a
reason and a review date. The allowlist currently covers two deferred major
upgrades:

- `next` 14 to 16 (also covers its bundled `postcss`)
- `@sendgrid/mail` 7 to 8 (also covers its nested `axios` and `@sendgrid/*`)

When the review date passes, the audit script fails until the upgrades are
done or the allowlist is renewed with a new date.

Dependabot opens weekly npm and GitHub Actions updates. Major Next.js and
SendGrid versions are ignored until that migration is planned.

## CI jobs

`.github/workflows/test.yml` runs:

1. **lint** - ESLint + Prettier
2. **typecheck** - `tsc --noEmit`
3. **test** - Jest with coverage thresholds, uploads the HTML report
4. **security** - production dependency audit
5. **build** - production Next.js build on pushes and manual runs
