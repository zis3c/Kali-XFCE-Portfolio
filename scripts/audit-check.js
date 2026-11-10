const { spawnSync } = require('child_process');
const allowlist = require('../audit-allowlist.json');

const env = { ...process.env };
delete env.npm_config_allow_scripts;

const isWindows = process.platform === 'win32';
const result = isWindows
  ? spawnSync(
      process.env.ComSpec || 'cmd.exe',
      ['/d', '/s', '/c', 'npm audit --omit=dev --json'],
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, env }
    )
  : spawnSync('npm', ['audit', '--omit=dev', '--json'], {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
      env,
    });

if (result.error || !result.stdout || !result.stdout.trim()) {
  console.error('Unable to run npm audit.');
  console.error(result.error || result.stderr);
  process.exit(1);
}

let report;
try {
  report = JSON.parse(result.stdout);
} catch (error) {
  console.error('Unable to parse npm audit output.');
  process.exit(1);
}

if (!report.metadata) {
  console.error('npm audit did not return a metadata report.');
  console.error(result.stdout.slice(0, 500));
  process.exit(1);
}

const vulnerabilities = report.vulnerabilities || {};
const allowed = new Set(allowlist.allow || []);
const blocking = Object.entries(vulnerabilities).filter(
  ([name, info]) =>
    ['high', 'critical'].includes(info.severity) && !allowed.has(name)
);

const counts = report.metadata.vulnerabilities || {};
console.log(
  `npm audit (production): ${counts.total || 0} total, ` +
    `${counts.high || 0} high, ${counts.critical || 0} critical`
);

const ignored = Object.entries(vulnerabilities).filter(
  ([name, info]) =>
    ['high', 'critical'].includes(info.severity) && allowed.has(name)
);
for (const [name, info] of ignored) {
  console.log(`- allowed ${info.severity}: ${name} (${allowlist.reason})`);
}

if (
  allowlist.reviewBy &&
  new Date() > new Date(`${allowlist.reviewBy}T23:59:59Z`)
) {
  console.error(
    `Audit allowlist expired on ${allowlist.reviewBy}. Review upgrades.`
  );
  process.exit(1);
}

if (blocking.length > 0) {
  console.error('\nBlocking vulnerabilities:');
  for (const [name, info] of blocking) {
    console.error(`- ${info.severity}: ${name}`);
  }
  process.exit(1);
}

console.log('No unapproved high or critical production vulnerabilities.');
