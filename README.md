# Kali XFCE Portfolio

![Next.js](https://img.shields.io/badge/Next.js-12-black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-17-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-3178C6?logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-State-764ABC?logo=redux&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

<p align="center">
  <img src="public/about/2.png" alt="Kali XFCE Portfolio Preview" width="900">
</p>

Live Demo: **[https://me.zis3c.dev/](https://me.zis3c.dev/)**

Interactive portfolio that simulates a **Kali Linux XFCE desktop** in browser. Includes boot flow, login screen, draggable windows, terminal emulator, file manager, Mousepad editor, and app launcher behavior.

> [!WARNING]
> This project is a simulation for portfolio and educational use. It is not a real operating system.

## Features

- Kali/XFCE-inspired desktop UI and workflow
- Boot -> login -> desktop sequence
- Login validation (`1234`)
- Workspace switcher and top panel app indicators
- Terminal emulator with custom commands
- Thunar-style file manager with virtual filesystem ops:
  - new folder
  - rename
  - delete (non-empty protection)
- Mousepad-style editor:
  - editable content
  - find / next / previous
  - replace mode
  - shortcuts: `Ctrl+S`, `Ctrl+F`, `Ctrl+H`
- Chrome-like in-app browser shell:
  - tab bar look
  - address bar history
  - back/forward navigation
- Notification daemon and panel context actions

## Stack

- Next.js
- React
- TypeScript
- Redux
- styled-components
- MongoDB (API routes: likes/comments/contact/news)

## Installation

1. **Clone repository**
   ```bash
   git clone <your-private-repo-url>
   cd Kali-XFCE-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**

   `.env.local`
   ```env
   DB_URI=your_mongodb_connection_string
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. Open:
   - `http://localhost:8888`

## Project Structure

```text
Kali-XFCE-Portfolio/
+-- backend/                 # Controllers, models, DB helpers
+-- components/              # Desktop, apps, portfolio UI
+-- design-system/           # Theme tokens and global styles
+-- pages/                   # Next.js pages + API routes
+-- public/                  # Icons, images, wallpapers
+-- store/                   # Redux reducers and action creators
+-- utils/                   # Virtual filesystem + helpers
+-- README.md
+-- package.json
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
```

## Login

- Password: `1234`

## Notes

- Virtual filesystem writes are in-memory only.
- Mousepad edits reset after refresh/restart.
- Build on Vercel configured to skip lint/type blocking during production build.

## License

MIT
