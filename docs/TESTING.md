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

- statements: 92%
- lines: 94%
- functions: 91%
- branches: 82%

The thresholds are deliberately just below the measured baseline (about 94%
statements, 95% lines, 93% functions, and 85% branches) so a real regression
fails CI, while small refactors do not.

## Test inventory

| Area       | Suites | Focus                                                                         |
| ---------- | ------ | ----------------------------------------------------------------------------- |
| Components | 58     | boot, login, desktop, taskbar, terminal, file manager, editor, portfolio mode |
| Redux      | 8      | reducers and action creators (UI, windows)                                    |
| Utilities  | 5      | filesystem, logging, env, notifications                                       |
| Hooks      | 3      | hover, mouse coordinates, reduced motion                                      |
| Pages      | 4      | home flow, error page, health                                                 |
| Design     | 1      | global styles                                                                 |

The current suite is 79 files and 438 tests.

Run a single suite with `npx jest <path>`.

## Security policy

`npm run audit` fails on unapproved high or critical production
vulnerabilities. `audit-allowlist.json` holds temporary exceptions with a
reason and a review date; it is currently empty.

The production tree is on Next.js 16.4.6. Overrides pin Next's nested `postcss`
to the patched 8.5.x line, `minimatch` under TypeScript ESLint to 11.0.1, and
`@tootallnate/once` to 2.0.1.

Storybook 6 was removed because it was not used by the app, CI, or deployment
and pulled in the vulnerable webpack/tar/postcss toolchain.

No high, critical, or moderate production advisories remain.

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
