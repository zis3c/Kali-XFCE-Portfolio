const quote = (filenames) =>
  filenames.map((filename) => `"${filename.replace(/"/g, '\\"')}"`).join(' ');

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npx tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `npm run lint`,
    `npx prettier --write ${quote(filenames)}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) => `npx prettier --write ${quote(filenames)}`,
};
