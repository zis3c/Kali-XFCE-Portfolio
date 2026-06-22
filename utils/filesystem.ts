/**
 * Simulated Linux filesystem for Kali Xfce portfolio OS.
 * Used by Terminal and Thunar File Manager.
 * 100% frontend-only — no real file access.
 */

/**
 * Simulated Linux filesystem for the Kali Xfce portfolio OS.
 *
 * Seed tree only. Runtime state lives in memory and is persisted to
 * localStorage for the demo shell and file manager.
 */

export interface FsNode {
  name: string;
  type: 'file' | 'dir';
  children?: FsNode[];
  content?: string;
  /** permission string for ls -la */
  perm?: string;
  size?: number;
}

const aboutTxt = `Name:       Radzi Zamri
Alias:      zis3c
Role:       Cybersecurity Student | Purple Team
CTF Team:   Dot Zero
University: Universiti Sultan Azlan Shah (USAS)
Focus:      Offensive & Defensive Security, Automation, Web Development
Approach:   Break it, fix it, automate it
Status:     Open to CTF collabs, research, and internships`;

const skillsTxt = `Security:    Penetration Testing, OSINT, Network Enumeration, OWASP Top 10
              Burp Suite, Nmap, Wireshark, Metasploit, Aircrack-ng, Ghidra
Offensive:   Web App Exploitation, Privilege Escalation, CTF Competitions
Defensive:   Log Analysis, SIEM, Incident Response, Threat Hunting
Languages:   Python, JavaScript, TypeScript, C++, Bash, SQL
Frontend:    React, Next.js, Styled-Components, Tailwind CSS
Backend:     Node.js, Express, FastAPI, PostgreSQL, MongoDB
DevOps:      Docker, Linux, Git, CI/CD, Nginx, DigitalOcean
Automation:  Telegram Bots, Web Scraping, Async I/O, CLIs`;

const contactTxt = `Email:      I24107504@student.usas.edu.my
GitHub:     https://github.com/zis3c
LinkedIn:   https://www.linkedin.com/in/radzizamri/
Instagram:  https://www.instagram.com/radz.z_/
YouTube:    https://www.youtube.com/@zis3c

Open to collaborations, CTF invites, and security research.`;

const notesMd = `# Notes

## TODO
- [ ] Complete Purple Team lab setup
- [ ] Write CTF writeup for latest competition
- [ ] Finish FinVault dashboard features
- [ ] Deploy Certclaim to production
- [ ] Update STEM-Telebot membership system

## Research
- OWASP API Security Top 10
- Container escape techniques
- Polyglot file bypass methods
- Reverse engineering ELF binaries`;

const bashrc = `# ~/.bashrc: executed by bash(1) for non-login shells.

export PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
export EDITOR=mousepad

# Kali prompt
PS1='\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]\\$ '

alias ll='ls -la'
alias la='ls -A'
alias l='ls -CF'
alias grep='grep --color=auto'

# enable color support
if [ -x /usr/bin/dircolors ]; then
    eval "$(dircolors -b)"
fi`;

const resumeContent = `resume.pdf — binary file
Use "open resume" in terminal or double-click in Thunar to view.`;

// Real GitHub project READMEs
const finvaultReadme = `# FinVault
AI-powered crypto wallet simulator built with Next.js, PostgreSQL, and Gemini-assisted fraud insights.

## Stack
- Next.js + TypeScript
- PostgreSQL + Prisma
- Google Gemini API
- Tailwind CSS + shadcn/ui`;

const certclaimReadme = `# Certclaim
A secure certificate claim portal with admin dashboard, QR access, attendance tracking, and Google Sheets integration.

## Stack
- Next.js + FastAPI
- PostgreSQL
- QR Code Generation
- Google Sheets API`;

const stemTelebotReadme = `# STEM-Telebot
A Telegram Bot to manage and verify student memberships using Google Sheets.

## Stack
- Python + Aiogram
- Google Sheets API
- Async I/O
- Docker`;

const qrbotReadme = `# QRBot
A versatile Telegram bot for generating and scanning QR codes — Text, WiFi, vCard, Geo, and Encoded.

## Stack
- Python + Aiogram
- Docker
- qrcode/pyzbar libraries`;

const polyglotReadme = `# Polyglot-File
A security tool to generate valid multi-format files (JPEG+PDF). For security research and file upload bypass testing.

## Stack
- Python
- File format manipulation
- Steganography techniques`;

const ctfWriteupsReadme = `# CTF-Writeups
Collection of CTF write-ups and solutions for learning and reference.

## Competitions
- HackTheBox
- TryHackMe
- PicoCTF
- Local university CTFs`;

const compilationREReadme = `# Compilation-and-RE-Process
Visualizing the lifecycle of code from source to binary and back again.

## Stack
- Python + CustomTkinter
- Assembly / C / Java
- Educational visualization tool`;

const tgreactsortReadme = `# Tgreactsort
Fetch, sort and visualize Telegram channel messages by reaction count using CLI and web dashboard.

## Stack
- Python + Telethon
- JavaScript + Chart.js
- CLI + Web Dashboard`;

const googleFormSpammerReadme = `# Google-Form-Spammer
A high-performance, asynchronous Google Forms stress-testing CLI. For educational and authorized testing only.

## Stack
- Python + aiohttp
- Async I/O
- CLI interface`;

const usasLauncherReadme = `# USAS-Launcher
An automated tool that instantly connects to the USAS campus WiFi and logs into student portals with one click.

## Stack
- Python
- Selenium / Automation
- Campus network integration`;

const usasNotifierReadme = `# USAS-Assignment-Notifier
Automated USAS assignment tracker. Syncs deadlines and gets real-time Telegram alerts.

## Stack
- Python
- Telegram Bot API
- Web scraping`;

const codexNotifierReadme = `# Codex-Notifier-VSCode
VS Code extension that notifies with sound and status/banner alerts when Codex responses finish.

## Stack
- JavaScript
- VS Code Extension API
- Audio notifications`;

const iotCloudReadme = `# basic-iot-cloud-setup
Basic IoT cloud infrastructure for KSC6493. Automated lab setup featuring Traefik, Node-RED, Mosquitto (MQTT), and time-series data visualization on DigitalOcean.

## Stack
- Shell / Docker Compose
- Traefik + Node-RED
- Mosquitto MQTT`;

/** The full virtual filesystem tree */
export const fsTree: FsNode = {
  name: '/',
  type: 'dir',
  children: [
    { name: 'bin', type: 'dir', children: [] },
    {
      name: 'boot',
      type: 'dir',
      children: [
        { name: 'vmlinuz-6.8.11-amd64', type: 'file', size: 12400000 },
        { name: 'initrd.img-6.8.11-amd64', type: 'file', size: 58000000 },
      ],
    },
    { name: 'dev', type: 'dir', children: [] },
    {
      name: 'etc',
      type: 'dir',
      children: [
        { name: 'hostname', type: 'file', content: 'kali' },
        {
          name: 'motd',
          type: 'file',
          content:
            'Kali GNU/Linux rolling\nAuthorized simulation environment only.',
        },
        {
          name: 'os-release',
          type: 'file',
          content:
            'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nVERSION_ID="2024.1"\nVERSION="2024.1"\nID=kali',
        },
        {
          name: 'passwd',
          type: 'file',
          content:
            'root:x:0:0:root:/root:/usr/bin/zsh\nzis3c:x:1000:1000:zis3c,,,:/home/zis3c:/usr/bin/zsh',
        },
      ],
    },
    {
      name: 'home',
      type: 'dir',
      children: [
        {
          name: 'zis3c',
          type: 'dir',
          children: [
            { name: '.bashrc', type: 'file', content: bashrc, size: 420 },
            {
              name: '.zshrc',
              type: 'file',
              content: '# zsh config\nsource ~/.bashrc',
              size: 32,
            },
            { name: 'about.txt', type: 'file', content: aboutTxt, size: 280 },
            { name: 'skills.txt', type: 'file', content: skillsTxt, size: 310 },
            {
              name: 'contact.txt',
              type: 'file',
              content: contactTxt,
              size: 180,
            },
            { name: 'notes.md', type: 'file', content: notesMd, size: 340 },
            {
              name: 'resume.pdf',
              type: 'file',
              content: resumeContent,
              size: 2048,
            },
            {
              name: 'Desktop',
              type: 'dir',
              children: [
                { name: 'Home.desktop', type: 'file', size: 64 },
                { name: 'Terminal.desktop', type: 'file', size: 64 },
              ],
            },
            {
              name: 'Documents',
              type: 'dir',
              children: [
                { name: 'notes.md', type: 'file', content: notesMd, size: 340 },
              ],
            },
            {
              name: 'Downloads',
              type: 'dir',
              children: [],
            },
            {
              name: 'Projects',
              type: 'dir',
              children: [
                {
                  name: 'FinVault',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: finvaultReadme,
                      size: 280,
                    },
                    {
                      name: 'package.json',
                      type: 'file',
                      content: '{ "name": "finvault", "version": "1.0.0" }',
                      size: 42,
                    },
                  ],
                },
                {
                  name: 'Certclaim',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: certclaimReadme,
                      size: 320,
                    },
                  ],
                },
                {
                  name: 'STEM-Telebot',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: stemTelebotReadme,
                      size: 240,
                    },
                    {
                      name: 'bot.py',
                      type: 'file',
                      content: '# STEM Telebot main entry',
                      size: 2400,
                    },
                  ],
                },
                {
                  name: 'QRBot',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: qrbotReadme,
                      size: 260,
                    },
                  ],
                },
                {
                  name: 'Polyglot-File',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: polyglotReadme,
                      size: 280,
                    },
                    {
                      name: 'polyglot.py',
                      type: 'file',
                      content: '# Polyglot file generator',
                      size: 1800,
                    },
                  ],
                },
                {
                  name: 'CTF-Writeups',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: ctfWriteupsReadme,
                      size: 220,
                    },
                  ],
                },
                {
                  name: 'Compilation-and-RE-Process',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: compilationREReadme,
                      size: 300,
                    },
                  ],
                },
                {
                  name: 'Tgreactsort',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: tgreactsortReadme,
                      size: 260,
                    },
                  ],
                },
                {
                  name: 'Google-Form-Spammer',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: googleFormSpammerReadme,
                      size: 280,
                    },
                  ],
                },
                {
                  name: 'USAS-Launcher',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: usasLauncherReadme,
                      size: 240,
                    },
                  ],
                },
                {
                  name: 'USAS-Assignment-Notifier',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: usasNotifierReadme,
                      size: 220,
                    },
                  ],
                },
                {
                  name: 'Codex-notifier-vscode',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: codexNotifierReadme,
                      size: 240,
                    },
                  ],
                },
                {
                  name: 'basic-iot-cloud-setup',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: iotCloudReadme,
                      size: 300,
                    },
                  ],
                },
              ],
            },
            {
              name: '.local',
              type: 'dir',
              children: [
                {
                  name: 'share',
                  type: 'dir',
                  children: [
                    {
                      name: 'Trash',
                      type: 'dir',
                      children: [
                        {
                          name: 'youtube-ads.txt',
                          type: 'file',
                          content: `YouTube Ads Rant
================

I have ads on YouTube. It's too much ads on YouTube.
Every single video, every single time. Pre-roll ads, mid-roll ads, post-roll ads.
You can't even watch a 2-minute tutorial without getting hit with THREE ads.

I hate that!!!

Seriously, who thought double unskippable ads was a good idea?
And now they're putting ads when you PAUSE the video too??

This is getting out of hand. Time to look into Pi-hole or something.

- zis3c`,
                          size: 420,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'lib', type: 'dir', children: [] },
    { name: 'media', type: 'dir', children: [] },
    { name: 'mnt', type: 'dir', children: [] },
    { name: 'opt', type: 'dir', children: [] },
    { name: 'proc', type: 'dir', children: [] },
    {
      name: 'root',
      type: 'dir',
      children: [
        {
          name: 'mystery',
          type: 'dir',
          children: [
            {
              name: 'README.txt',
              type: 'file',
              content: `Woah woah rilex!

This is just simulation.
No real privilege escalation happened.
This portfolio terminal is a frontend sandbox for demo only.`,
              size: 138,
            },
          ],
        },
      ],
    },
    { name: 'tmp', type: 'dir', children: [] },
    {
      name: 'usr',
      type: 'dir',
      children: [
        { name: 'bin', type: 'dir', children: [] },
        { name: 'lib', type: 'dir', children: [] },
        { name: 'share', type: 'dir', children: [] },
      ],
    },
    {
      name: 'var',
      type: 'dir',
      children: [
        { name: 'log', type: 'dir', children: [] },
        { name: 'tmp', type: 'dir', children: [] },
      ],
    },
  ],
};

/**
 * Resolve a path like "~" or "~/Projects" or "/home/zis3c" to an absolute path.
 */
export function resolvePath(cwd: string, target: string): string {
  // Expand ~
  let resolved = target.replace(/^~/, '/home/zis3c');

  // If relative, join with cwd
  if (!resolved.startsWith('/')) {
    const base = cwd.replace(/^~/, '/home/zis3c');
    resolved = base + '/' + resolved;
  }

  // Normalize .. and .
  const parts = resolved.split('/').filter(Boolean);
  const stack: string[] = [];
  for (const part of parts) {
    if (part === '..') {
      stack.pop();
    } else if (part !== '.') {
      stack.push(part);
    }
  }
  return '/' + stack.join('/');
}

/**
 * Find a node in the filesystem tree by absolute path.
 */
export function findNode(absPath: string): FsNode | null {
  if (absPath === '/') return fsTree;

  const parts = absPath.split('/').filter(Boolean);
  let current: FsNode = fsTree;

  for (const part of parts) {
    if (current.type !== 'dir' || !current.children) return null;
    const child = current.children.find((c) => c.name === part);
    if (!child) return null;
    current = child;
  }

  return current;
}

/**
 * List directory contents (like `ls`).
 */
export function listDir(absPath: string): string[] | null {
  const node = findNode(absPath);
  if (!node || node.type !== 'dir') return null;
  return (node.children || []).map(
    (c) => c.name + (c.type === 'dir' ? '/' : '')
  );
}

/**
 * List directory contents in long format (like `ls -la`).
 */
export function listDirLong(absPath: string): string | null {
  const node = findNode(absPath);
  if (!node || node.type !== 'dir' || !node.children) return null;

  const now = new Date();
  const dateStr = `${now.toLocaleString('en-US', { month: 'short' })} ${String(
    now.getDate()
  ).padStart(2, ' ')} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;

  const lines: string[] = [`total ${node.children.length * 4}`];
  // . and ..
  lines.push(
    `drwxr-xr-x  ${node.children.length + 2} zis3c zis3c 4096 ${dateStr} .`
  );
  lines.push(`drwxr-xr-x  3 zis3c zis3c 4096 ${dateStr} ..`);

  for (const child of node.children) {
    if (child.type === 'dir') {
      const nChildren = (child.children?.length || 0) + 2;
      lines.push(
        `drwxr-xr-x  ${nChildren} zis3c zis3c 4096 ${dateStr} ${child.name}`
      );
    } else {
      const sz = String(child.size || child.content?.length || 0).padStart(
        5,
        ' '
      );
      lines.push(`-rw-r--r--  1 zis3c zis3c ${sz} ${dateStr} ${child.name}`);
    }
  }
  return lines.join('\n');
}

/**
 * Read file content (like `cat`).
 */
export function readFile(absPath: string): string | null {
  const node = findNode(absPath);
  if (!node || node.type !== 'file') return null;
  return node.content ?? `${node.name}: binary file`;
}

function persistVfsToStorage() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('kali_vfs', JSON.stringify(fsTree));
    } catch (e) {
      console.error('Failed to save VFS to localStorage', e);
    }
  }
}

function hydrateVfsFromStorage() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const saved = localStorage.getItem('kali_vfs');
    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    if (parsed && parsed.type === 'dir' && Array.isArray(parsed.children)) {
      fsTree.children = parsed.children;
    }
  } catch (e) {
    console.error('Failed to load VFS from localStorage', e);
  }
}

hydrateVfsFromStorage();

export function resetVfs(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('kali_vfs');
      window.location.reload();
    } catch (e) {
      console.error('Failed to reset VFS', e);
    }
  }
}

/**
 * Write file content in virtual FS.
 */
export function writeFile(absPath: string, content: string): boolean {
  const node = findNode(absPath);
  if (!node || node.type !== 'file') return false;
  node.content = content;
  node.size = content.length;
  persistVfsToStorage();
  return true;
}

function splitParent(absPath: string): { parentPath: string; name: string } {
  const clean = absPath.replace(/\/+$/, '') || '/';
  const parts = clean.split('/').filter(Boolean);
  const name = parts.pop() || '';
  const parentPath = '/' + parts.join('/');
  return { parentPath: parentPath === '' ? '/' : parentPath, name };
}

export function createFile(absPath: string, content: string = ''): boolean {
  const { parentPath, name } = splitParent(absPath);
  if (!name) return false;
  const parent = findNode(parentPath);
  if (!parent || parent.type !== 'dir') return false;
  parent.children = parent.children || [];
  if (parent.children.some((c) => c.name === name)) return false;
  parent.children.push({ name, type: 'file', content, size: content.length });
  persistVfsToStorage();
  return true;
}

export function createDir(absPath: string): boolean {
  const { parentPath, name } = splitParent(absPath);
  if (!name) return false;
  const parent = findNode(parentPath);
  if (!parent || parent.type !== 'dir') return false;
  parent.children = parent.children || [];
  if (parent.children.some((c) => c.name === name)) return false;
  parent.children.push({ name, type: 'dir', children: [] });
  persistVfsToStorage();
  return true;
}

export function renameNode(absPath: string, newName: string): boolean {
  const safeName = newName.trim();
  if (!safeName || safeName.includes('/')) return false;
  const { parentPath, name } = splitParent(absPath);
  const parent = findNode(parentPath);
  if (!parent || parent.type !== 'dir' || !parent.children) return false;
  if (parent.children.some((c) => c.name === safeName)) return false;
  const node = parent.children.find((c) => c.name === name);
  if (!node) return false;
  node.name = safeName;
  persistVfsToStorage();
  return true;
}

export function deleteNode(absPath: string): boolean {
  const { parentPath, name } = splitParent(absPath);
  const parent = findNode(parentPath);
  if (!parent || parent.type !== 'dir' || !parent.children) return false;
  const target = parent.children.find((c) => c.name === name);
  if (!target) return false;
  if (target.type === 'dir' && target.children && target.children.length > 0) {
    return false;
  }
  parent.children = parent.children.filter((c) => c.name !== name);
  persistVfsToStorage();
  return true;
}

/**
 * Check if a path exists and is a directory.
 */
export function isDir(absPath: string): boolean {
  const node = findNode(absPath);
  return node !== null && node.type === 'dir';
}

/**
 * Convert an absolute path back to ~ notation for display.
 */
export function toTildePath(absPath: string): string {
  if (absPath === '/home/zis3c') return '~';
  if (absPath.startsWith('/home/zis3c/'))
    return '~/' + absPath.slice('/home/zis3c/'.length);
  return absPath;
}
