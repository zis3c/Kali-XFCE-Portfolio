# kali-xfce-portfolio

Interactive portfolio website that simulates a Kali Linux XFCE desktop experience in the browser.

This project includes boot -> login -> desktop flow, draggable windows, app launcher, terminal emulator, file manager, Mousepad-like editor, and portfolio content integrated as desktop apps.

## Live Concept

- Kali/XFCE-inspired UI and panel behavior
- Desktop app icons and window management
- Session actions (logout/restart)
- Virtual filesystem for portfolio files and project notes

## Main Features

- Boot and login flow
  - Boot screen sequence
  - Login screen with password check (`1234`)

- Desktop environment
  - Workspace switcher
  - Top panel with app icons for running windows
  - App menu and system tray interactions

- Apps
  - Terminal emulator with custom commands
  - Thunar-style file manager
    - new folder
    - rename
    - delete (safe guard on non-empty folders)
  - Mousepad-style editor
    - editable text
    - find / prev / next
    - replace toggle
    - shortcuts: `Ctrl+S`, `Ctrl+F`, `Ctrl+H`
  - Chrome-like browser shell with URL bar history and iframe content

- Portfolio data integration
  - About, skills, contact, projects presented as OS files/apps
  - Notifications for system/app actions

## Tech Stack

- Next.js
- React
- TypeScript
- Redux
- styled-components
- MongoDB (for likes/comments/contact/news APIs)

## Project Structure (high level)

- `components/` UI, desktop environment, apps
- `pages/` Next.js pages and API routes
- `backend/` controllers/models/config for API logic
- `store/` Redux reducers/actions
- `utils/` virtual filesystem and helpers
- `public/` icons, wallpapers, assets

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create `.env.local` and set database URI for API routes:

```env
DB_URI=your_mongodb_connection_string
```

### 3. Run development server

```bash
npm run dev
```

Open:

- `http://localhost:8888`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Login Credentials

- Password: `1234`

## Notes

- Files edited in Mousepad are stored in virtual in-memory filesystem and reset after refresh/restart.
- Some features are simulation-first for realism and portfolio storytelling.

## License

MIT
