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
reason and a review date; it is currently empty.

The production tree is on Next.js 15.5.29 and `@sendgrid/mail` 8.1.6. A
`postcss` override pins Next's nested copy to the patched 8.5.x line, so no
high or critical advisories remain. Only low-severity transitive advisories
from SendGrid's `deepmerge` remain and are accepted.

When the review date passes, the audit script fails until the allowlist is
reviewed and renewed.

Dependabot opens weekly npm and GitHub Actions updates.

## CI jobs

`.github/workflows/test.yml` runs:

1. **lint** - ESLint + Prettier
2. **typecheck** - `tsc --noEmit`
3. **test** - Jest with coverage thresholds, uploads the HTML report
4. **security** - production dependency audit
5. **build** - production Next.js build on pushes and manual runs

`.github/workflows/codeql.yml` runs CodeQL security-and-quality analysis on
pushes, pull requests, and a weekly schedule.
