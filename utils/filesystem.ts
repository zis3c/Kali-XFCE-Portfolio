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
Role:       Cybersecurity & CS Undergrad | Purple Team | RE Trainer
CTF Team:   Dot Zero (U545) — ctftime.org/team/421634
University: Universiti Sultan Azlan Shah (USAS)
Degree:     Bachelor of Computer Science (CGPA: 3.83 | Dean's List Sem 1-4)
Diploma:    Diploma in Information Technology (CGPA: 3.77 | Dean's List 4 Sems)
Focus:      Threat Detection, Reverse Engineering, Honeypot Telemetry, Full-Stack Tooling
Status:     Seeking 14-Week Cybersecurity Internship (Feb 2027) | Open to CTF collabs`;

const skillsTxt = `Disassemblers/RE: Ghidra, IDA Pro, Binary Ninja, Radare2 / Cutter, JADX, Apktool
Debuggers/Dynamic: x64dbg, GDB + GEF, Frida (Dynamic Binary Instrumentation), Immunity Debugger
Binary & Malware: PE-bear, Detect It Easy (DIE), CAPA, Process Hacker, Pwntools, Wireshark, Volatility
Specializations:  Static & Dynamic Decompilation, Binary Patching, Hooking, Anti-Debugging Bypass,
                  Control-Flow Triage, ELF/PE/APK Internals, HASSH Fingerprinting, MITRE ATT&CK
Defensive/SOC:    SSH Honeypots (CloudSentinel), Threat Detection, Automated Firewall Blocking,
                  SIEM/SOAR Workflows, ClickHouse Log Aggregations, Incident Response
Programming:      Python, C, C++, TypeScript, JavaScript, PHP, SQL, Bash
Web & Frameworks: React, Next.js, Laravel 13, Inertia.js, Tailwind CSS, FastAPI, Node.js
Databases/Cloud:  PostgreSQL, ClickHouse, Redis, Docker, Linux, DigitalOcean, Git / CI/CD
AI & Automation:  Codex, DeepSeek, Antigravity, Agentic Workflows, Telegram Bots, CLI Tools
Languages:        Bahasa Melayu (Native), English (Fluent)`;

const contactTxt = `Radzi bin Zamri (zis3c)
Role:       Cybersecurity & CS Undergrad (CGPA 3.83) | Purple Team
Location:   Selangor, Malaysia
Email:      r.zradzizamri@gmail.com
Portfolio:  https://me.zis3c.dev
GitHub:     https://github.com/zis3c
LinkedIn:   https://linkedin.com/in/radzizamri
Instagram:  https://instagram.com/radz.z_
YouTube:    https://youtube.com/@zis3c

Seeking 14-Week Cybersecurity Internship (Feb 2027) | Open to CTF collabs & research.`;

const notesMd = `# Notes & Active Agenda (2026)

## Active Projects & Milestones
- [x] CloudSentinel: SSH Honeypot with ClickHouse + Next.js dashboard & <1ms firewall blocker
- [x] RedLilyGO: ESP32-S3 firmware with USB HID & PCAP capture + .NET 8 desktop companion
- [x] JanjiCare: Laravel 13 + React 18 clinic booking & WebRTC telehealth consultation portal
- [ ] Finalize FYP report and CloudSentinel benchmark documentation
- [ ] Prepare for 14-week Cybersecurity Internship (commencing February 2027)
- [ ] Organize next Dot Zero internal MockCTF & Advanced Binary Analysis / Frida workshop
- [ ] Expand USAS Assignment Notifier & Timetable for next semester intake

## Research Interests
- SSH/RDP Honeypot telemetry & automated SOAR containment
- Advanced ELF & PE binary reverse engineering (Ghidra, IDA Pro, x64dbg, GDB+GEF, Frida)
- Dynamic Binary Instrumentation (DBI) & runtime hooking for API call interception
- Anti-analysis evasion: anti-debugging, packing detection, and string deobfuscation
- ESP32-S3 hardware security & wireless packet analysis
- OWASP Mobile Top 10 remediation & Android hybrid app security`;

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

const resumeContent = `RADZI BIN ZAMRI
Cybersecurity & Computer Science Undergrad (CGPA: 3.83)
Selangor, Malaysia | r.zradzizamri@gmail.com
me.zis3c.dev | github.com/zis3c | linkedin.com/in/radzizamri

OBJECTIVE
Computer Science undergraduate at Universiti Sultan Azlan Shah (CGPA 3.83) seeking a 14-week
Cybersecurity Internship starting February 2027 in Selangor or Kuala Lumpur. Practical experience
in threat detection, reverse engineering, and full-stack development, with the goal of contributing
effectively to SOC monitoring, incident response, or penetration testing teams.

EDUCATION
- Bachelor of Computer Science - Universiti Sultan Azlan Shah (2024 - 2027) | CGPA: 3.83 (Dean's List Sem I-IV)
- Diploma in Information Technology - Universiti Sultan Azlan Shah (2021 - 2024) | CGPA: 3.77 (Dean's List 4 Sems)

FEATURED PROJECTS
- CloudSentinel (FYP 2026): Python SSH Honeypot, HASSH, MITRE ATT&CK, ClickHouse & Next.js
- Google Forms Spammer: High-performance async stress tester with aiohttp & web configurator
- RedLilyGO (2026): ESP32-S3 Security Firmware, USB HID, PCAP capture, .NET 8 Companion App
- JanjiCare (2026): Clinic Web Appointment & Telehealth (Laravel 13, React 18, WebRTC LiveKit)
- Dot Zero CTF Pipeline & RE Training: Team Secretary & RE Trainer (Ghidra, IDA, x64dbg, GDB, Frida)
- STEM-USAS Ecosystem: stem.zis3c.dev & STEM-Telebot membership automation
- USAS Assignment Notifier & Timetable: Telegram alert bot & jadualkelas.zis3c.dev
- Polyglot Files: Dual-signature file generator & parser confusion research

CERTIFICATIONS
- Google Cybersecurity Professional Certificate - Coursera (2026)
- Reverse Engineering Bootcamp: Ghidra, IDA, Linux, and x86_64 - Udemy (2026)`;

// Real GitHub project READMEs
const cloudSentinelReadme = `# CloudSentinel: SSH Honeypot & Threat Detection System (FYP)
A high-interaction SSH honeypot deployed on DigitalOcean designed to capture brute-force intrusions and attacker commands in real time.

## Key Features
- HASSH client fingerprinting & 20 MITRE ATT&CK rules to classify scanner traffic.
- Automated firewall IP blocking with <1ms median response time during benchmark testing.
- Real-time Next.js analytics dashboard backed by ClickHouse (fast aggregations) and Redis (session cache).
- GeoIP tracking and attack telemetry visualization.

## Stack
- Python (Honeypot Core, Async I/O)
- Next.js + TypeScript (Dashboard)
- ClickHouse (Time-series log storage)
- Redis (Session cache & pub/sub)
- DigitalOcean (Cloud deployment)
- iptables / firewall automation`;

const redLilygoReadme = `# RedLilyGO: ESP32-S3 Security Testing Firmware
Custom C++ firmware for the LILYGO T-Dongle-S3 USB research dongle for authorized hardware security assessments and network analysis.

## Key Features
- Authorized USB HID payload injection & keystroke automation.
- Wi-Fi packet capture (PCAP) saving to onboard storage.
- Local web interface and .NET 8 desktop companion app to manage scripts and saved captures via USB serial.
- Hardened CI workflow with CodeQL, Semgrep, and Gitleaks security scans on every commit.

## Stack
- C++ (ESP32-S3 Arduino / ESP-IDF)
- .NET 8 (Desktop companion application)
- WebSockets & Web UI
- GitHub Actions Security Pipeline`;

const janjiCareReadme = `# JanjiCare: Clinic Web Appointment & Telehealth System
Full-stack healthcare booking and telehealth platform designed for modern clinical operations.

## Key Features
- Role-based access control (RBAC) separating Patient, Doctor, and Administrator portals.
- Real-time live queue management powered by Laravel Reverb WebSockets.
- Integrated LiveKit WebRTC video consultations secured by server-signed JWT room tokens.
- Automated appointment notifications and management workflows.

## Stack
- Laravel 13 & PHP 8.3
- React 18 & Inertia.js
- Tailwind CSS
- Laravel Reverb (WebSockets)
- LiveKit WebRTC`;

const ctfPipelineReadme = `# Dot Zero CTF Pipeline & RE Workshops
Workspace automation and reverse engineering toolkit developed for the USAS CTF Team (Dot Zero / U545).

## Highlights
- CTFd automation CLI: fetch challenges, initialize writeup skeletons, and track flag submissions.
- Hands-on Reverse Engineering workshops: Ghidra & IDA Pro static decompiler analysis, x64dbg & GDB+GEF dynamic binary patching, and Frida runtime API hooking.
- Binary crackmes & anti-reversing: ELF/PE structure internals, anti-debugging evasion, and control-flow triage.
- Team CTF achievements: 21st in RE:UN10N CTF 2025, 88th in ApoorvCTF 2026, 133rd / 1359 teams in 0xFun CTF 2026.

## Stack
- Python & Bash
- Ghidra, IDA Pro, x64dbg, GDB+GEF, Frida
- CTFd REST API`;

const stemWebReadme = `# STEM-USAS Web Portal
Official student association portal for STEM Universiti Sultan Azlan Shah (stem.zis3c.dev).

## Key Features
- Association announcements, committee profiles, and event registration.
- Responsive modern interface built with React and TypeScript.
- Integrated with STEM-Telebot for member verification and digital receipts.

## Stack
- React & TypeScript
- Tailwind CSS
- Vercel Deployment`;

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
              name: 'resume.txt',
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
                  name: 'CloudSentinel',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: cloudSentinelReadme,
                      size: 420,
                    },
                    {
                      name: 'honeypot.py',
                      type: 'file',
                      content:
                        '# CloudSentinel SSH Honeypot Core\n# DigitalOcean deployment with HASSH & MITRE ATT&CK rules',
                      size: 3100,
                    },
                  ],
                },
                {
                  name: 'RedLilyGO',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: redLilygoReadme,
                      size: 380,
                    },
                    {
                      name: 'firmware.cpp',
                      type: 'file',
                      content:
                        '// RedLilyGO ESP32-S3 Firmware\n// USB HID payload automation & Wi-Fi PCAP capture',
                      size: 2800,
                    },
                  ],
                },
                {
                  name: 'JanjiCare',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: janjiCareReadme,
                      size: 350,
                    },
                    {
                      name: 'routes.php',
                      type: 'file',
                      content:
                        '<?php // JanjiCare routes: Laravel 13, Inertia & LiveKit WebRTC ?>',
                      size: 1500,
                    },
                  ],
                },
                {
                  name: 'CTF-Pipeline',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: ctfPipelineReadme,
                      size: 340,
                    },
                    {
                      name: 'pipeline.py',
                      type: 'file',
                      content:
                        '# Dot Zero CTF Pipeline Automation\n# CTFd challenge fetcher & write-up generator',
                      size: 2200,
                    },
                  ],
                },
                {
                  name: 'STEM-Web',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content: stemWebReadme,
                      size: 280,
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
                {
                  name: 'Kali-XFCE-Portfolio',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# Kali-XFCE-Portfolio\nInteractive portfolio simulating Kali Linux XFCE desktop with apps, terminal, and session flow (Next.js, TypeScript, Redux).',
                      size: 260,
                    },
                  ],
                },
                {
                  name: 'USAS-Class-Timetable',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# USAS-Class-Timetable\nThe timetable portal for USAS students to manage, view, and export their class schedules (jadualkelas.zis3c.dev).',
                      size: 240,
                    },
                  ],
                },
                {
                  name: 'LLM-API-Lab',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# LLM-API-Lab\nLightweight static playground for testing LLM provider integrations with OpenAPI contract and browser dashboard.',
                      size: 230,
                    },
                  ],
                },
                {
                  name: 'LilyGO-T-Dongle-S3-Firmware',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# LilyGO-T-Dongle-S3-Firmware\nLilyGO T-Dongle-S3 firmware with board matrix, flash helper, smoke test, docs, and release validation.',
                      size: 240,
                    },
                  ],
                },
                {
                  name: 'MLBB-CounterDraft',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# MLBB-CounterDraft\nMobile Legends draft helper with live sync, hero catalog hygiene, and scoring logic (Next.js, TypeScript).',
                      size: 230,
                    },
                  ],
                },
                {
                  name: 'USAS-VC-Evaluation-Automator',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# USAS-VC-Evaluation-Automator\nLightweight JavaScript automation tool and userscript for the Course Teaching Evaluation Form on USAS VirtualCampus.',
                      size: 250,
                    },
                  ],
                },
                {
                  name: 'RE-App-UMC-Student-USAS',
                  type: 'dir',
                  children: [
                    {
                      name: 'README.md',
                      type: 'file',
                      content:
                        '# RE-App-UMC-Student-USAS (Private Research)\nAndroid mobile application security review and high-level Smali static analysis. Sensitive details are kept private.',
                      size: 210,
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
  // The VFS stores public portfolio demo content, not secrets.
  // lgtm[js/clear-text-storage-of-sensitive-data]
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

export function createFile(absPath: string, content = ''): boolean {
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
