# Security Policy

## Supported versions

Security fixes are applied to the latest release on `main`. Older tags are not maintained.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting:

1. Open the repository's **Security** tab.
2. Choose **Report a vulnerability**.
3. Include the affected version, steps to reproduce, and the impact you expect.

Do not open a public issue for a vulnerability. Reports are reviewed on a best-effort basis, and you will get a reply through the private advisory thread.

## Scope

In scope:

- the Next.js application, API routes, and build configuration in this repository
- dependency vulnerabilities that affect the production bundle

Out of scope:

- the simulated Kali desktop acting like a real operating system
- content injection through the portfolio's own static data files
- vulnerabilities in third-party services such as MongoDB Atlas or Vercel
