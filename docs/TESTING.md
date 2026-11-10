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

- statements: 90%
- lines: 90%
- functions: 88%
- branches: 75%

The thresholds are deliberately just below the measured baseline (about 92%
statements, 94% lines, 91% functions, and 79% branches) so a real regression
fails CI, while small refactors do not.

## Test inventory

| Area       | Suites | Focus                                                                         |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| API routes | 3      | contact form validation, CORS, rate limiting, health endpoint                 |
| Backend    | 3      | Mongo connection helpers, SendGrid controller, Contact model                  |
| Middleware | 5      | error mapping, correlation IDs, security headers, rate limiting               |
| Redux      | 12     | reducers and action creators (news, contact, UI, windows, todos)              |
| Utilities  | 13     | filesystem, retry, logging, env, API features, notifications                  |
| Hooks      | 9      | hover, outside click, mouse coordinates, reduced motion, observer             |
| Components | 75+    | boot, login, desktop, taskbar, terminal, file manager, editor, portfolio mode |
| Pages      | 4      | home flow, error page, health, contact                                        |

The current suite is 122 files and 563 tests.

Run a single suite with `npx jest <path>`.

## Security policy

`npm run audit` fails on unapproved high or critical production
vulnerabilities. `audit-allowlist.json` holds temporary exceptions with a
reason and a review date; it is currently empty.

The production tree is on Next.js 15.5.29 and `@sendgrid/mail` 8.1.6. Overrides
pin Next's nested `postcss` to the patched 8.5.x line, `minimatch` under
TypeScript ESLint to 11.0.1, and `@tootallnate/once` to 2.0.1.

Storybook 6 was removed because it was not used by the app, CI, or deployment
and pulled in the vulnerable webpack/tar/postcss toolchain.

No high, critical, or moderate production advisories remain. The only
remaining finding is low-severity `deepmerge` (through SendGrid), which has no
patched version yet; the corresponding Dependabot alert is dismissed as
"no patch available".

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
