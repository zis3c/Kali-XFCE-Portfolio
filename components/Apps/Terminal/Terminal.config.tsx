import { useActions } from '../../../hooks/useActions';
import React from 'react';
import TextViewer from '../TextViewer/TextViewer';
import FileManager from '../FileManager/FileManager';
import {
  resolvePath,
  findNode,
  listDir,
  listDirLong,
  readFile,
  isDir,
  toTildePath,
  createFile,
  createDir,
  deleteNode,
  resetVfs,
} from '../../../utils/filesystem';

interface CommandResult {
  output: string;
  isError: boolean;
  /** If set, terminal should update cwd to this value */
  newPath?: string;
}

// Boot timestamp for uptime calculation
const bootTime = Date.now();

export const useTerminalCommands = (TerminalComponent?: React.ComponentType): {
  executeCommand: (cmd: string, currentPath: string) => CommandResult | null;
} => {
  const { openWindow } = useActions();

  const getNeofetchOutput = () => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const uptimeMin = Math.floor((Date.now() - bootTime) / 60000);
    const uptimeStr = uptimeMin < 1 ? 'less than a minute' : `${uptimeMin} min${uptimeMin > 1 ? 's' : ''}`;
    const memUsed = Math.floor(Math.random() * 800 + 1200);

    return `       ..,,;;;::;,..          zis3c@kali
    .;lxOOOOOOOOOOOOxl;.      ----------
  ,dOOOOOOOOOOOOOOOOOOOd,     OS: Kali GNU/Linux Rolling x86_64
 lOOOOOOOOOOOOOOOOOOOOOOl     Host: kali
;OOOOOOOOOOOOOOOOOOOOOOOO;     Kernel: 6.8.11-amd64
:OOOOOOOOOOOOOOOOOOOOOOOO:     Uptime: ${uptimeStr}
:OOOOOOOOOOOOOOOOOOOOOOOO:     Packages: 2684 (dpkg)
:OOOOOOOOOOOOOOOOOOOOOOOO:     Shell: zsh 5.9
;OOOOOOOOOOOOOOOOOOOOOOOO;     Resolution: ${w}x${h}
 lOOOOOOOOOOOOOOOOOOOOOOl     DE: Xfce 4.18
  'dOOOOOOOOOOOOOOOOOOOd'     WM: Xfwm4
    .;lxOOOOOOOOOOOOxl;.      Theme: Kali-Dark [GTK3]
       ..',;;;::;,'..          Icons: Flat-Remix-Blue-Dark
                               Terminal: xfce4-terminal
                               CPU: Intel Core i7-10750H
                               Memory: ${memUsed}MiB / 8192MiB

  ╔═══════════════════════════════════════════╗
  ║  Radzi Zamri (zis3c)                      ║
  ║  Cybersecurity Student | Purple Team      ║
  ║  CTF Team: Dot Zero                       ║
  ║  Universiti Sultan Azlan Shah             ║
  ║  github.com/zis3c                         ║
  ╚═══════════════════════════════════════════╝`;
  };

  const helpOutput = `Available commands:

  System:
    help              Show this help message
    whoami            Display current user
    id                Display user/group IDs
    hostname          Show hostname
    pwd               Print working directory
    date              Show current date and time
    uname -a          Show system information
    uptime            Show system uptime
    neofetch          Show system info with ASCII art
    fastfetch         Alias for neofetch
    lsb_release -a    Show distribution info
    free -h           Show memory usage
    df -h             Show disk usage
    who               Show logged-in users
    history           Show command history

  Files:
    ls                List directory contents
    ls -la            List with details
    cd <dir>          Change directory
    cd ..             Go to parent directory
    cat <file>        Display file contents
    touch <file>      Create an empty file
    mkdir <dir>       Create a directory
    rm <file/dir>     Remove a file or empty directory
    mousepad <file>   Open file in Mousepad editor
    vfs-reset         Reset filesystem to defaults
    clear             Clear terminal (or Ctrl+L)

  Portfolio:
    open <app>        Open app (about, projects, skills, contact, resume, terminal, files)
    skills --list     List technical skills
    projects --list   List project folders

  Kali Tools (info only):
    nmap --version
    wireshark --version
    msfconsole --version
    aircrack-ng --version
    xfconf-query --version

  echo <text>         Print text
  sudo <cmd>          Run command as root (password: 1234)`;

  const executeCommand = (
    cmd: string,
    currentPath: string
  ): CommandResult | null => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    const absPath = resolvePath(currentPath, '.');

    switch (command) {
      case 'help':
        return { output: helpOutput, isError: false };

      case 'whoami':
        return { output: 'zis3c', isError: false };

      case 'id':
        return {
          output: 'uid=1000(zis3c) gid=1000(zis3c) groups=1000(zis3c),27(sudo)',
          isError: false,
        };

      case 'hostname':
        return { output: 'kali', isError: false };

      case 'neofetch':
      case 'fastfetch':
        return { output: getNeofetchOutput(), isError: false };

      case 'ls': {
        if (args[0] === '-la' || args[0] === '-l' || args[0] === '-al') {
          const targetPath = args[1] ? resolvePath(currentPath, args[1]) : absPath;
          const result = listDirLong(targetPath);
          if (!result) return { output: `ls: cannot access '${args[1] || '.'}': No such file or directory`, isError: true };
          return { output: result, isError: false };
        }
        const targetPath = args[0] && !args[0].startsWith('-') ? resolvePath(currentPath, args[0]) : absPath;
        const items = listDir(targetPath);
        if (!items) return { output: `ls: cannot access '${args[0] || '.'}': No such file or directory`, isError: true };
        return { output: items.join('  '), isError: false };
      }

      case 'cd': {
        const target = args[0] || '~';
        if (target === '-') {
          return { output: '', isError: false, newPath: '~' };
        }
        const newAbsPath = resolvePath(currentPath, target);
        if (isDir(newAbsPath)) {
          return { output: '', isError: false, newPath: toTildePath(newAbsPath) };
        }
        return {
          output: `bash: cd: ${target}: No such file or directory`,
          isError: true,
        };
      }

      case 'pwd':
        return {
          output: absPath,
          isError: false,
        };

      case 'cat': {
        if (!args[0]) {
          return { output: 'cat: missing file operand', isError: true };
        }
        const filePath = resolvePath(currentPath, args[0]);
        const content = readFile(filePath);
        if (content !== null) {
          return { output: content, isError: false };
        }
        // Check if it's a directory
        if (isDir(filePath)) {
          return { output: `cat: ${args[0]}: Is a directory`, isError: true };
        }
        return {
          output: `cat: ${args[0]}: No such file or directory`,
          isError: true,
        };
      }

      case 'skills':
        if (args[0] === '--list') {
          const content = readFile('/home/zis3c/skills.txt');
          return { output: content || '', isError: false };
        }
        return { output: `skills: unknown option '${args[0] || ''}'`, isError: true };

      case 'projects':
        if (args[0] === '--list') {
          const items = listDir('/home/zis3c/Projects');
          return { output: items ? items.join('\n') : 'No projects found', isError: false };
        }
        return { output: `projects: unknown option '${args[0] || ''}'`, isError: true };

      case 'open': {
        if (!args[0]) {
          return { output: 'Usage: open <app>', isError: true };
        }
        const app = args[0].toLowerCase();
        if (app === 'about') {
          const aboutContent = readFile('/home/zis3c/about.txt');
          openWindow({
            windowName: 'about.txt — Mousepad',
            isOpen: true,
            windowIcon: 'KALI_TEXTFILE',
            size: { width: 560, height: 420 },
            windowContent: (
              <TextViewer
                content={aboutContent || ''}
                filename="about.txt"
                filepath="/home/zis3c/about.txt"
              />
            ),
          });
          return { output: 'Opening about.txt...', isError: false };
        }
        if (app === 'projects') {
          openWindow({
            windowName: 'File Manager',
            isOpen: true,
            windowIcon: 'KALI_FILEMANAGER',
            size: { width: 700, height: 450 },
            windowContent: <FileManager startPath="/home/zis3c/Projects" />,
          });
          return { output: 'Opening projects...', isError: false };
        }
        if (app === 'skills') {
          const skillsContent = readFile('/home/zis3c/skills.txt');
          openWindow({
            windowName: 'skills.txt — Mousepad',
            isOpen: true,
            windowIcon: 'KALI_TEXTFILE',
            size: { width: 560, height: 420 },
            windowContent: (
              <TextViewer
                content={skillsContent || ''}
                filename="skills.txt"
                filepath="/home/zis3c/skills.txt"
              />
            ),
          });
          return { output: 'Opening skills.txt...', isError: false };
        }
        if (app === 'contact') {
          const contactContent = readFile('/home/zis3c/contact.txt');
          openWindow({
            windowName: 'contact.txt — Mousepad',
            isOpen: true,
            windowIcon: 'KALI_TEXTFILE',
            size: { width: 560, height: 420 },
            windowContent: (
              <TextViewer
                content={contactContent || ''}
                filename="contact.txt"
                filepath="/home/zis3c/contact.txt"
              />
            ),
          });
          return { output: 'Opening contact.txt...', isError: false };
        }
        if (app === 'resume') {
          const resumeContent = readFile('/home/zis3c/resume.pdf');
          openWindow({
            windowName: 'resume.pdf — Mousepad',
            isOpen: true,
            windowIcon: 'KALI_TEXTFILE',
            size: { width: 560, height: 420 },
            windowContent: (
              <TextViewer content={resumeContent || 'resume.pdf — binary file'} filename="resume.pdf" />
            ),
          });
          return { output: 'Opening resume.pdf...', isError: false };
        }
        if (app === 'terminal') {
          openWindow({
            windowName: 'Terminal - zis3c@kali:~',
            isOpen: true,
            windowIcon: 'KALI_TERMINAL',
            size: { width: 640, height: 420 },
            windowContent: TerminalComponent ? <TerminalComponent /> : <div />,
          });
          return { output: 'Opening new terminal...', isError: false };
        }
        if (app === 'files' || app === 'filemanager' || app === 'thunar') {
          openWindow({
            windowName: 'File Manager',
            isOpen: true,
            windowIcon: 'KALI_FILEMANAGER',
            size: { width: 700, height: 450 },
            windowContent: <FileManager />,
          });
          return { output: 'Opening file manager...', isError: false };
        }
        return {
          output: `open: '${args[0]}' — application not found`,
          isError: true,
        };
      }

      case 'date':
        return { output: new Date().toString(), isError: false };

      case 'uname':
        return {
          output: 'Linux kali 6.8.11-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux',
          isError: false,
        };

      case 'uptime': {
        const mins = Math.floor((Date.now() - bootTime) / 60000);
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        return {
          output: ` ${timeStr} up ${mins} min,  1 user,  load average: 0.12, 0.08, 0.03`,
          isError: false,
        };
      }

      case 'free':
        return {
          output: `               total        used        free      shared  buff/cache   available
Mem:           8192        ${1200 + Math.floor(Math.random() * 600)}        ${4200 + Math.floor(Math.random() * 800)}          42        2748        6544
Swap:          2048           0        2048`,
          isError: false,
        };

      case 'df':
        return {
          output: `Filesystem     1K-blocks     Used Available Use% Mounted on
/dev/sda1       51200000 12840000  35720000  27% /
tmpfs            4096000        0   4096000   0% /dev/shm
/dev/sda2      102400000 28160000  68960000  29% /home`,
          isError: false,
        };

      case 'who':
        return {
          output: `zis3c    tty7         ${new Date().toISOString().slice(0, 16).replace('T', ' ')} (:0)`,
          isError: false,
        };

      case 'lsb_release':
        return {
          output: `Distributor ID: Kali
Description:    Kali GNU/Linux Rolling
Release:        2024.1
Codename:       kali-rolling`,
          isError: false,
        };

      case 'xfconf-query':
        return {
          output: 'xfconf-query version 4.18.1',
          isError: false,
        };

      case 'nmap':
        if (args[0] === '--version') {
          return {
            output: `Nmap version 7.94SVN ( https://nmap.org )
Platform: x86_64-pc-linux-gnu
Compiled with: nmap-liblua-5.4.6 openssl-3.1.4 nmap-libssh2-1.11.0 libz-1.3 nmap-libpcre2-10.42 nmap-libpcap-1.10.4 nmap-libdnet-1.14 ipv6`,
            isError: false,
          };
        }
        if (args[0]) {
          const target = args[0];
          const openPorts = [
            '22/tcp   open  ssh',
            '80/tcp   open  http',
            '443/tcp  open  https',
          ];
          return {
            output: `Starting Nmap 7.94SVN ( https://nmap.org ) at ${new Date().toISOString().replace('T', ' ').slice(0, 19)}
Nmap scan report for ${target}
Host is up (0.032s latency).
Not shown: 997 filtered tcp ports (no-response)
PORT     STATE SERVICE
${openPorts.join('\n')}

Nmap done: 1 IP address (1 host up) scanned in 2.31 seconds`,
            isError: false,
          };
        }
        return { output: 'Usage: nmap [Scan Type(s)] [Options] {target specification}\nTry "nmap --version" for version info.', isError: false };

      case 'wireshark':
        if (args[0] === '--version') {
          return {
            output: `Wireshark 4.2.0 (Git v4.2.0 packaged as 4.2.0-1)
Compiled (64-bit) using GCC 13.2.0, with GLib 2.78.1, with Qt 6.6.1`,
            isError: false,
          };
        }
        return { output: 'Try "wireshark --version" for version info.', isError: false };

      case 'msfconsole':
        if (args[0] === '--version') {
          return {
            output: 'Framework Version: 6.4.0-dev',
            isError: false,
          };
        }
        return { output: 'Try "msfconsole --version" for version info.', isError: false };

      case 'aircrack-ng':
        if (args[0] === '--version') {
          return {
            output: 'Aircrack-ng 1.7',
            isError: false,
          };
        }
        return { output: 'Try "aircrack-ng --version" for version info.', isError: false };

      case 'echo':
        return { output: args.join(' '), isError: false };

      case 'history':
        return {
          output: 'Use Arrow Up/Down to browse command history.',
          isError: false,
        };

      case 'sudo':
        return { output: '[sudo] password for zis3c:', isError: false };

      case 'rm': {
        if (!args[0]) {
          return { output: 'rm: missing operand', isError: true };
        }
        const rmPath = resolvePath(currentPath, args[0]);
        if (deleteNode(rmPath)) {
          return { output: '', isError: false };
        }
        return { output: `rm: cannot remove '${args[0]}': No such file or non-empty directory`, isError: true };
      }

      case 'mkdir': {
        if (!args[0]) {
          return { output: 'mkdir: missing operand', isError: true };
        }
        const mkdirPath = resolvePath(currentPath, args[0]);
        if (createDir(mkdirPath)) {
          return { output: '', isError: false };
        }
        return { output: `mkdir: cannot create directory '${args[0]}': File or directory exists`, isError: true };
      }

      case 'touch': {
        if (!args[0]) {
          return { output: 'touch: missing operand', isError: true };
        }
        const touchPath = resolvePath(currentPath, args[0]);
        if (createFile(touchPath, '')) {
          return { output: '', isError: false };
        }
        return { output: `touch: cannot touch '${args[0]}': File exists or path invalid`, isError: true };
      }

      case 'vfs-reset':
        resetVfs();
        return { output: 'Resetting virtual filesystem...', isError: false };

      case 'mousepad':
      case 'nano': {
        if (!args[0]) {
          return { output: 'Usage: mousepad <filename>', isError: true };
        }
        const filePath = resolvePath(currentPath, args[0]);
        const filename = args[0].split('/').pop() || 'untitled';
        
        let node = findNode(filePath);
        if (!node) {
          createFile(filePath, '');
          node = findNode(filePath);
        }
        
        if (node && node.type === 'dir') {
          return { output: `mousepad: '${args[0]}': Is a directory`, isError: true };
        }

        const fileContent = node?.content || '';

        openWindow({
          windowName: `${filename} — Mousepad`,
          isOpen: true,
          windowIcon: 'KALI_TEXTFILE',
          size: { width: 560, height: 420 },
          windowContent: (
            <TextViewer
              content={fileContent}
              filename={filename}
              filepath={filePath}
            />
          ),
        });
        return { output: `Opening ${filename} in Mousepad...`, isError: false };
      }

      case 'apt':
      case 'apt-get':
        return {
          output: 'E: Could not open lock file - are you root?',
          isError: true,
        };

      case 'ifconfig':
      case 'ip':
        return {
          output: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.42  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::a00:27ff:fea4:1234  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:a4:12:34  txqueuelen 1000  (Ethernet)`,
          isError: false,
        };

      case 'ping':
        return {
          output: `PING ${args[0] || 'localhost'}: 56 data bytes\n64 bytes: icmp_seq=1 ttl=64 time=0.042 ms\n--- ${args[0] || 'localhost'} ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`,
          isError: false,
        };

      case 'man':
        if (args[0] === 'sudo') {
          return {
            output: `SUDO(8)
NAME
    sudo - execute a command as another user

DESCRIPTION
    sudo allows a permitted user to execute a command as the superuser.
    In this simulation, password is: 1234.
`,
            isError: false,
          };
        }
        if (args[0] === 'nmap') {
          return {
            output: `NMAP(1)
NAME
    nmap - Network exploration tool and security scanner

SYNOPSIS
    nmap [Scan Type(s)] [Options] {target specification}

EXAMPLE
    nmap scanme.nmap.org`,
            isError: false,
          };
        }
        if (args[0] === 'ls') {
          return {
            output: `LS(1)
NAME
    ls - list directory contents

SYNOPSIS
    ls [OPTION]... [FILE]...
    ls -la`,
            isError: false,
          };
        }
        return {
          output: `What manual page do you want?\nFor example, try 'man man'.`,
          isError: false,
        };

      case 'exit':
        return {
          output: 'exit',
          isError: false,
        };

      case 'tree': {
        const node = findNode(absPath);
        if (!node || node.type !== 'dir' || !node.children) {
          return { output: `${absPath} [error opening dir]`, isError: true };
        }
        const lines = [toTildePath(absPath)];
        const buildTree = (children: typeof node.children, prefix: string) => {
          if (!children) return;
          children.forEach((child, i) => {
            const isLast = i === children.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            lines.push(prefix + connector + child.name);
            if (child.type === 'dir' && child.children) {
              buildTree(child.children, prefix + (isLast ? '    ' : '│   '));
            }
          });
        };
        buildTree(node.children, '');
        return { output: lines.join('\n'), isError: false };
      }

      default: {
        // Additional realistic commands
        const extraCommands: Record<string, string> = {
          'which': args[0]
            ? `/usr/bin/${args[0]}`
            : 'which: missing argument',
          'type': args[0]
            ? `${args[0]} is /usr/bin/${args[0]}`
            : 'type: missing argument',
          'alias': "alias ll='ls -la'\nalias la='ls -A'\nalias l='ls -CF'\nalias grep='grep --color=auto'",
          'env': `USER=zis3c\nHOME=/home/zis3c\nSHELL=/usr/bin/zsh\nLOGNAME=zis3c\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nLANG=en_US.UTF-8\nTERM=xterm-256color\nXDG_SESSION_TYPE=x11\nXDG_CURRENT_DESKTOP=XFCE\nDISPLAY=:0\nEDITOR=mousepad`,
          'export': 'Usage: export NAME=VALUE',
          'ps': `  PID TTY          TIME CMD\n    1 ?        00:00:01 systemd\n  842 ?        00:00:00 xfce4-session\n  856 ?        00:00:02 xfwm4\n  860 ?        00:00:01 xfce4-panel\n  865 ?        00:00:00 Thunar\n  912 pts/0    00:00:00 zsh\n  ${1000 + Math.floor(Math.random() * 200)} pts/0    00:00:00 ps`,
          'top': 'top - use Ctrl+C to exit\n\nTasks: 142 total,   1 running, 141 sleeping,   0 stopped\n%Cpu(s):  2.3 us,  0.8 sy,  0.0 ni, 96.4 id\nMiB Mem :   8192.0 total,   4521.3 free,   1842.7 used,   1828.0 buff\n\n  PID USER      PR  NI    VIRT    RES  COMMAND\n  856 zis3c     20   0  248912  42120  xfwm4\n  860 zis3c     20   0  312456  38904  xfce4-panel\n  842 zis3c     20   0  186240  22456  xfce4-session',
          'grep': args.length > 0
            ? `Usage: grep [OPTION]... PATTERNS [FILE]...\nTry 'grep --help' for more information.`
            : `Usage: grep [OPTION]... PATTERNS [FILE]...`,
          'find': args.length > 0
            ? `find: '${args[0]}': simulated filesystem only`
            : 'Usage: find [path] [expression]',
          'wc': args[0]
            ? `  12  48 280 ${args[0]}`
            : 'Usage: wc [OPTION]... [FILE]...',
          'head': args[0]
            ? (() => {
                const content = readFile(resolvePath(currentPath, args[0]));
                if (content) return content.split('\n').slice(0, 10).join('\n');
                return `head: cannot open '${args[0]}' for reading: No such file or directory`;
              })()
            : 'Usage: head [OPTION]... [FILE]...',
          'tail': args[0]
            ? (() => {
                const content = readFile(resolvePath(currentPath, args[0]));
                if (content) {
                  const lines = content.split('\n');
                  return lines.slice(Math.max(0, lines.length - 10)).join('\n');
                }
                return `tail: cannot open '${args[0]}' for reading: No such file or directory`;
              })()
            : 'Usage: tail [OPTION]... [FILE]...',
          'sort': 'Usage: sort [OPTION]... [FILE]...',
          'chmod': 'chmod: cannot change permissions: Read-only file system',
          'chown': 'chown: cannot change ownership: Read-only file system',
          'file': args[0]
            ? `${args[0]}: UTF-8 Unicode text`
            : 'Usage: file [OPTION...] [FILE...]',
          'stat': args[0]
            ? `  File: ${args[0]}\n  Size: 420       \tBlocks: 8          IO Block: 4096   regular file\nDevice: 801h/2049d\tInode: 131074     Links: 1\nAccess: (0644/-rw-r--r--)  Uid: ( 1000/  zis3c)   Gid: ( 1000/  zis3c)\nModify: ${new Date().toISOString()}`
            : "stat: missing operand\nTry 'stat --help' for more information.",
          'du': args[0] === '-h' || args[0] === '-sh'
            ? '124M\t.'
            : `4.0K\t./Desktop\n8.0K\t./Documents\n0\t./Downloads\n36K\t./Projects\n124K\t.`,
          'mount': '/dev/sda1 on / type ext4 (rw,relatime)\ntmpfs on /dev/shm type tmpfs (rw,nosuid,nodev)\n/dev/sda2 on /home type ext4 (rw,relatime)',
          'cp': 'cp: cannot copy: Read-only file system',
          'mv': 'mv: cannot move: Read-only file system',
          'wget': args[0]
            ? `Connecting to ${args[0]}...\nHTTP request sent, awaiting response...\nNote: This is a simulated environment. No actual download performed.`
            : 'Usage: wget [OPTION]... [URL]...',
          'curl': args[0]
            ? `curl: (7) Couldn't connect to server — simulated environment`
            : 'Usage: curl [options...] <url>',
          'ssh': args[0]
            ? `ssh: connect to host ${args[0]} port 22: Connection refused\n(Simulated environment — no network access)`
            : 'usage: ssh [-o option] [-p port] [user@]hostname',
          'scp': 'scp: simulated environment — no network access',
          'systemctl': args[0] === 'status'
            ? `● kali.service - Kali Desktop Session\n     Loaded: loaded\n     Active: active (running)\n   Main PID: 842 (xfce4-session)\n      Tasks: 24\n     Memory: 142.8M`
            : args[0] === 'list-units'
            ? `UNIT                      LOAD   ACTIVE SUB     DESCRIPTION\nsystemd-logind.service    loaded active running Login Service\nNetworkManager.service    loaded active running Network Manager\nxfce4-session.service     loaded active running Xfce Session`
            : 'Usage: systemctl [OPTIONS...] COMMAND ...',
          'journalctl': 'May 17 12:00:01 kali systemd[1]: Started Xfce Session.\nMay 17 12:00:02 kali xfwm4[856]: Window manager started.\nMay 17 12:00:03 kali xfce4-panel[860]: Panel loaded.',
          'dpkg': args[0] === '-l'
            ? 'Desired=Unknown/Install/Remove\n| Status=Not/Inst/Conf-files\n||/ Name                    Version          Description\n+++-=======================-================-==================\nii  nmap                    7.94+git-1       Network exploration tool\nii  wireshark               4.2.0-1          Network protocol analyzer\nii  aircrack-ng             1:1.7-5          Wireless network security tools\nii  metasploit-framework    6.4.0-dev        Penetration testing framework'
            : `dpkg-query: ${args.length > 0 ? args.join(' ') : 'no packages found'}`,
          'xdg-open': args[0]
            ? `Opening ${args[0]}...`
            : 'Usage: xdg-open <file|url>',
        };

        const extraResult = extraCommands[command];
        if (extraResult !== undefined) {
          const isErr = extraResult.includes('cannot') || extraResult.includes('error') || extraResult.includes('missing') || extraResult.includes('refused');
          return { output: extraResult, isError: isErr };
        }

        const known = [
          'nmap', 'sudo', 'ls', 'cat', 'cd', 'pwd', 'help', 'man', 'grep',
          'find', 'echo', 'history', 'whoami', 'hostname', 'neofetch',
        ];
        const suggestion =
          known.find((k) => k.startsWith(command[0] || '')) ||
          known.find((k) => k.includes(command.slice(0, 2)));
        return {
          output: suggestion
            ? `command not found: ${command}\nDid you mean: ${suggestion}`
            : `command not found: ${command}`,
          isError: true,
        };
      }
    }
  };

  return { executeCommand };
};


