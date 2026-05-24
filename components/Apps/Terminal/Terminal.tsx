import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Styled from './Terminal.styles';
import { useTerminalCommands } from './Terminal.config';
import { listDir, readFile, resolvePath } from '../../../utils/filesystem';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  /** The path at the time this line was entered (for accurate prompt rendering) */
  promptPath?: string;
  promptUser?: string;
  promptChar?: '$ ' | '# ';
}

interface TerminalTheme {
  name: string;
  vars: React.CSSProperties;
}

interface PersistedTerminalState {
  history: TerminalLine[];
  commandHistory: string[];
  currentPath: string;
  isRoot: boolean;
  selectedTheme: string;
  previousUserPath?: string;
}

interface TerminalTab {
  id: number;
  label: string;
}

const STORAGE_KEY = 'kali_terminal_state_v1';
const TAB_META_KEY = 'kali_terminal_tabs_v1';
const MAX_HISTORY_LINES = 350;

const terminalThemes: TerminalTheme[] = [
  {
    name: 'Kali Dark',
    vars: {
      ['--terminal-bg' as string]: '#1a1b26',
      ['--terminal-menu-bg' as string]: '#24263a',
      ['--terminal-menu-border' as string]: '#141621',
      ['--terminal-prompt-user' as string]: '#5ad65a',
      ['--terminal-prompt-path' as string]: '#66a3ff',
      ['--terminal-command' as string]: 'rgba(218, 223, 230, 0.92)',
      ['--terminal-output' as string]: 'rgba(196, 202, 212, 0.9)',
      ['--terminal-error' as string]: '#e06c75',
      ['--terminal-cursor' as string]: '#5ad65a',
      ['--terminal-status-bg' as string]: '#12131b',
      ['--terminal-status-text' as string]: 'rgba(160, 168, 180, 0.85)',
    },
  },
  {
    name: 'Green Phosphor',
    vars: {
      ['--terminal-bg' as string]: '#0a0f0a',
      ['--terminal-menu-bg' as string]: '#101910',
      ['--terminal-menu-border' as string]: '#1a2a1a',
      ['--terminal-prompt-user' as string]: '#8cff8c',
      ['--terminal-prompt-path' as string]: '#79e279',
      ['--terminal-command' as string]: '#a9f7a9',
      ['--terminal-output' as string]: '#89d989',
      ['--terminal-error' as string]: '#ff8a8a',
      ['--terminal-cursor' as string]: '#9cff9c',
      ['--terminal-status-bg' as string]: '#0d140d',
      ['--terminal-status-text' as string]: '#7ad07a',
    },
  },
  {
    name: 'Light Console',
    vars: {
      ['--terminal-bg' as string]: '#f5f7fa',
      ['--terminal-menu-bg' as string]: '#e6ebf2',
      ['--terminal-menu-border' as string]: '#c9d2de',
      ['--terminal-prompt-user' as string]: '#1a7f37',
      ['--terminal-prompt-path' as string]: '#1457c1',
      ['--terminal-command' as string]: '#1f2937',
      ['--terminal-output' as string]: '#374151',
      ['--terminal-error' as string]: '#b42318',
      ['--terminal-cursor' as string]: '#1a7f37',
      ['--terminal-status-bg' as string]: '#e7edf6',
      ['--terminal-status-text' as string]: '#49566b',
    },
  },
];

/**
 * xfce4-terminal style emulator with menu bar.
 * Supports: Ctrl+L, Ctrl+C, Ctrl+U, Ctrl+W, Ctrl+A, Ctrl+E,
 * Arrow Up/Down history, Tab autocomplete (commands + file paths),
 * !!, command chaining (;), and pipe display.
 */
const Terminal = (): JSX.Element => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState('~');
  const [previousUserPath, setPreviousUserPath] = useState('~');
  const [isRoot, setIsRoot] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('Kali Dark');
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [lastTabToken, setLastTabToken] = useState('');
  const [tabRepeatCount, setTabRepeatCount] = useState(0);
  const [isAwaitingSudoPassword, setIsAwaitingSudoPassword] = useState(false);
  const [sudoPasswordBuffer, setSudoPasswordBuffer] = useState('');
  const [tabs, setTabs] = useState<TerminalTab[]>([{ id: 1, label: 'Tab 1' }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { executeCommand } = useTerminalCommands(Terminal);

  const getTabStorageKey = useCallback(
    (tabId: number) => `${STORAGE_KEY}_tab_${tabId}`,
    []
  );

  const getBootLines = useCallback((): TerminalLine[] => {
    const now = new Date();
    const loginDate = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const motd = readFile('/etc/motd');
    return [
      {
        type: 'output',
        content: `Last login: ${loginDate} on tty7`,
      },
      ...(motd ? [{ type: 'output' as const, content: motd }] : []),
      { type: 'output', content: "Type 'help' for available commands." },
    ];
  }, []);

  const resetSession = useCallback(() => {
    setHistory(getBootLines());
    setCommandHistory([]);
    setCurrentPath('~');
    setPreviousUserPath('~');
    setIsRoot(false);
    setHistoryIndex(-1);
    setInputValue('');
    setIsAwaitingSudoPassword(false);
    setSudoPasswordBuffer('');
  }, [getBootLines]);

  const loadTabState = useCallback(
    (tabId: number) => {
      if (typeof window === 'undefined') return;
      const raw = window.localStorage.getItem(getTabStorageKey(tabId));
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as PersistedTerminalState;
          setHistory((parsed.history || []).slice(-MAX_HISTORY_LINES));
          setCommandHistory(parsed.commandHistory || []);
          setCurrentPath(parsed.currentPath || '~');
          setPreviousUserPath(parsed.previousUserPath || '~');
          setIsRoot(Boolean(parsed.isRoot));
          setSelectedTheme(parsed.selectedTheme || 'Kali Dark');
          setIsAwaitingSudoPassword(false);
          setSudoPasswordBuffer('');
          setHistoryIndex(-1);
          setInputValue('');
          return;
        } catch {
          resetSession();
          return;
        }
      }
      resetSession();
    },
    [getTabStorageKey, resetSession]
  );

  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  useEffect(() => {
    inputRef.current?.focus();
    if (typeof window !== 'undefined') {
      const savedTabsRaw = window.localStorage.getItem(TAB_META_KEY);
      if (savedTabsRaw) {
        try {
          const parsedTabs = JSON.parse(savedTabsRaw) as TerminalTab[];
          if (Array.isArray(parsedTabs) && parsedTabs.length > 0) {
            setTabs(parsedTabs);
            const defaultTabId = parsedTabs[0].id;
            setActiveTabId(defaultTabId);
            loadTabState(defaultTabId);
            return;
          }
        } catch {
          resetSession();
        }
      }
      loadTabState(1);
    }
  }, [loadTabState, resetSession]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const toSave: PersistedTerminalState = {
      history: history.slice(-MAX_HISTORY_LINES),
      commandHistory: commandHistory.slice(0, 200),
      currentPath,
      isRoot,
      selectedTheme,
      previousUserPath,
    };
    window.localStorage.setItem(
      getTabStorageKey(activeTabId),
      JSON.stringify(toSave)
    );
    window.localStorage.setItem(TAB_META_KEY, JSON.stringify(tabs));
  }, [
    history,
    commandHistory,
    currentPath,
    isRoot,
    selectedTheme,
    previousUserPath,
    getTabStorageKey,
    activeTabId,
    tabs,
  ]);

  const appendHistory = useCallback((lines: TerminalLine[]) => {
    setHistory((prev) => [...prev, ...lines].slice(-MAX_HISTORY_LINES));
  }, []);

  const computeLatency = (commandLine: string): number => {
    const cmd = commandLine.split(/\s+/)[0]?.toLowerCase() || '';
    const heavyCommands = [
      'nmap',
      'msfconsole',
      'aircrack-ng',
      'wireshark',
      'find',
      'grep',
      'tree',
      'neofetch',
      'fastfetch',
      'dpkg',
      'systemctl',
      'journalctl',
      'ping',
    ];
    if (heavyCommands.includes(cmd)) {
      return 320 + Math.floor(Math.random() * 900);
    }
    return 40 + Math.floor(Math.random() * 110);
  };

  const sleep = (ms: number) =>
    new Promise((resolve) => window.setTimeout(resolve, ms));

  const streamOutputLines = async (
    lines: TerminalLine[],
    commandLine: string
  ): Promise<void> => {
    const hasHeavyOutput =
      commandLine.split(/\s+/)[0]?.toLowerCase() &&
      lines.some((l) => l.type !== 'input' && l.content.includes('\n'));

    if (!hasHeavyOutput) {
      appendHistory(lines);
      return;
    }

    const first = lines[0];
    appendHistory([first]);

    for (const line of lines.slice(1)) {
      if (line.type === 'output' || line.type === 'error') {
        const chunks = line.content.split('\n');
        for (const chunk of chunks) {
          appendHistory([{ ...line, content: chunk }]);
          await sleep(18 + Math.floor(Math.random() * 38));
        }
      } else {
        appendHistory([line]);
      }
    }
  };

  /** Run a single command string, returns lines to append */
  const runSingleCommand = (
    cmd: string,
    path: string
  ): { lines: TerminalLine[]; newPath: string } => {
    let activePath = path;
    const lines: TerminalLine[] = [];

    if (cmd === 'clear') {
      return { lines: [], newPath: activePath };
    }

    // Root-only path guards
    if (!isRoot) {
      const parts = cmd.trim().split(/\s+/);
      const command = parts[0]?.toLowerCase();
      const arg = parts[1];
      const blockedExact = '/etc/shadow';
      if (command === 'cat' && arg) {
        const target = resolvePath(path, arg);
        if (target === blockedExact || target.startsWith('/root')) {
          return {
            lines: [
              {
                type: 'error',
                content: `${command}: ${arg}: Permission denied`,
              },
            ],
            newPath: path,
          };
        }
      }
      if ((command === 'ls' || command === 'cd') && arg) {
        const target = resolvePath(path, arg);
        if (target.startsWith('/root')) {
          return {
            lines: [
              {
                type: 'error',
                content: `${command}: cannot access '${arg}': Permission denied`,
              },
            ],
            newPath: path,
          };
        }
      }
    }

    if (
      cmd === 'cat ~/.bash_history' ||
      cmd === 'cat /home/zis3c/.bash_history'
    ) {
      const historyText = [...commandHistory]
        .slice()
        .reverse()
        .map((entry, idx) => `${idx + 1}  ${entry}`)
        .join('\n');
      return {
        lines: [{ type: 'output', content: historyText || '(empty)' }],
        newPath: path,
      };
    }

    const result = executeCommand(cmd, activePath);
    if (result) {
      if (result.newPath !== undefined) {
        activePath = result.newPath;
      }
      if (result.output) {
        lines.push({
          type: result.isError ? 'error' : 'output',
          content: result.output,
        });
      }
    }

    return { lines, newPath: activePath };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRunningCommand) return;
    let cmd = inputValue.trim();

    if (isAwaitingSudoPassword) {
      appendHistory([
        {
          type: 'input',
          content: '',
          promptPath: '',
          promptUser: '',
          promptChar: '$ ' as const,
        },
      ]);
      if (sudoPasswordBuffer === '1234') {
        appendHistory([{ type: 'output', content: 'root shell activated' }]);
        setPreviousUserPath(currentPath);
        setCurrentPath('/root');
        setIsRoot(true);
      } else {
        appendHistory([{ type: 'error', content: 'Sorry, try again.' }]);
      }
      setIsAwaitingSudoPassword(false);
      setSudoPasswordBuffer('');
      setInputValue('');
      return;
    }

    // Empty enter — just echo prompt
    if (!cmd) {
      appendHistory([{ type: 'input', content: '', promptPath: currentPath }]);
      setInputValue('');
      return;
    }

    // !! — repeat last command
    if (cmd === '!!') {
      if (commandHistory.length > 0) {
        cmd = commandHistory[0];
      } else {
        appendHistory([
          { type: 'input', content: '!!', promptPath: currentPath },
          { type: 'error', content: 'bash: !!: event not found' },
        ]);
        setInputValue('');
        return;
      }
    }

    if (
      cmd === 'sudo' ||
      cmd === 'sudo -i' ||
      cmd === 'sudo su' ||
      cmd === 'su'
    ) {
      appendHistory([{ type: 'input', content: cmd, promptPath: currentPath }]);
      setIsAwaitingSudoPassword(true);
      setSudoPasswordBuffer('');
      setInputValue('');
      return;
    }

    if (cmd === 'exit' && isRoot) {
      appendHistory([
        { type: 'input', content: cmd, promptPath: currentPath },
        { type: 'output', content: 'logout' },
      ]);
      setCurrentPath(previousUserPath || '~');
      setIsRoot(false);
      setInputValue('');
      return;
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      {
        type: 'input',
        content: cmd,
        promptPath: currentPath,
        promptUser: isRoot ? 'root@kali' : 'zis3c@kali',
        promptChar: isRoot ? '# ' : '$ ',
      },
    ];

    // Handle clear specially
    if (cmd === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

    setIsRunningCommand(true);
    await sleep(computeLatency(cmd));

    // Support command chaining with ; (e.g. "whoami; hostname")
    const subCommands = cmd.split(/\s*;\s*/);
    let activePath = currentPath;

    for (const sub of subCommands) {
      const trimmed = sub.trim();
      if (!trimmed) continue;

      if (trimmed === 'clear') {
        setHistory([]);
        setInputValue('');
        setCurrentPath(activePath);
        setIsRunningCommand(false);
        return;
      }

      const { lines, newPath } = runSingleCommand(trimmed, activePath);
      activePath = newPath;
      newLines.push(...lines);
    }

    setCurrentPath(activePath);
    await streamOutputLines(newLines, cmd);
    setInputValue('');
    setIsRunningCommand(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isAwaitingSudoPassword) {
      if (e.key === 'Enter') {
        return;
      }
      if (e.key === 'Backspace') {
        e.preventDefault();
        setSudoPasswordBuffer((prev) => prev.slice(0, -1));
        return;
      }
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setSudoPasswordBuffer((prev) => prev + e.key);
        return;
      }
    }

    // Ctrl+L — clear screen
    if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
      return;
    }

    // Ctrl+C — cancel current input, print ^C
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      setHistory((prev) => [
        ...prev,
        {
          type: 'input',
          content: inputValue + '^C',
          promptPath: currentPath,
        },
      ]);
      setInputValue('');
      setHistoryIndex(-1);
      return;
    }

    // Ctrl+U — clear line before cursor
    if (e.key === 'u' && e.ctrlKey) {
      e.preventDefault();
      const pos = e.currentTarget.selectionStart ?? inputValue.length;
      setInputValue(inputValue.slice(pos));
      return;
    }

    // Ctrl+W — delete last word
    if (e.key === 'w' && e.ctrlKey) {
      e.preventDefault();
      const pos = e.currentTarget.selectionStart ?? inputValue.length;
      const before = inputValue.slice(0, pos);
      const after = inputValue.slice(pos);
      const trimmed = before.replace(/\s*\S+\s*$/, '');
      setInputValue(trimmed + after);
      return;
    }

    // Ctrl+A — move cursor to start
    if (e.key === 'a' && e.ctrlKey) {
      e.preventDefault();
      e.currentTarget.setSelectionRange(0, 0);
      return;
    }

    // Ctrl+E — move cursor to end
    if (e.key === 'e' && e.ctrlKey) {
      e.preventDefault();
      const len = inputValue.length;
      e.currentTarget.setSelectionRange(len, len);
      return;
    }

    // Ctrl+K — delete from cursor to end
    if (e.key === 'k' && e.ctrlKey) {
      e.preventDefault();
      const pos = e.currentTarget.selectionStart ?? inputValue.length;
      setInputValue(inputValue.slice(0, pos));
      return;
    }

    // Arrow Up — previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
      return;
    }

    // Arrow Down — next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
      return;
    }

    // Tab — autocomplete commands and file paths
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = inputValue;
      const isSameToken = val === lastTabToken;
      const currentRepeatCount = isSameToken ? tabRepeatCount + 1 : 1;
      setLastTabToken(val);
      setTabRepeatCount(currentRepeatCount);

      // Known commands for first-word completion
      const knownCommands = [
        'help',
        'clear',
        'pwd',
        'whoami',
        'hostname',
        'date',
        'uname',
        'uptime',
        'echo',
        'history',
        'ls',
        'cd',
        'cat',
        'open',
        'skills',
        'projects',
        'neofetch',
        'fastfetch',
        'free',
        'df',
        'who',
        'lsb_release',
        'nmap',
        'wireshark',
        'msfconsole',
        'aircrack-ng',
        'tree',
        'sudo',
        'exit',
        'id',
        'ifconfig',
        'ip',
        'ping',
        'man',
        'which',
        'type',
        'alias',
        'env',
        'export',
        'ps',
        'grep',
        'find',
        'wc',
        'head',
        'tail',
        'sort',
        'chmod',
        'chown',
        'file',
        'stat',
        'du',
        'mount',
        'touch',
        'mkdir',
        'rm',
        'cp',
        'mv',
      ];

      const parts = val.split(/\s+/);
      if (parts.length <= 1) {
        // Complete command name
        const prefix = parts[0];
        const matches = knownCommands.filter((c) => c.startsWith(prefix));
        if (matches.length === 1) {
          setInputValue(matches[0] + ' ');
        } else if (matches.length > 1) {
          if (currentRepeatCount >= 2) {
            appendHistory([{ type: 'output', content: matches.join('  ') }]);
          }
        }
      } else {
        // Complete file/dir path for the last argument
        const lastArg = parts[parts.length - 1];
        const dirPart = lastArg.includes('/')
          ? lastArg.slice(0, lastArg.lastIndexOf('/') + 1)
          : '';
        const filePart = lastArg.includes('/')
          ? lastArg.slice(lastArg.lastIndexOf('/') + 1)
          : lastArg;

        const dirToSearch = dirPart
          ? resolvePath(currentPath, dirPart)
          : resolvePath(currentPath, '.');
        const entries = listDir(dirToSearch);

        if (entries) {
          const cleaned = entries.map((e) => e.replace(/\/$/, ''));
          const matches = cleaned.filter((name) => name.startsWith(filePart));

          if (matches.length === 1) {
            const isDirectory = entries.find((e) => e === matches[0] + '/');
            const completion = dirPart + matches[0] + (isDirectory ? '/' : ' ');
            parts[parts.length - 1] = completion;
            setInputValue(parts.join(' '));
          } else if (matches.length > 1) {
            // Show possibilities and complete common prefix
            const commonPrefix = matches.reduce((a, b) => {
              let i = 0;
              while (i < a.length && i < b.length && a[i] === b[i]) i++;
              return a.slice(0, i);
            });
            if (commonPrefix.length > filePart.length) {
              parts[parts.length - 1] = dirPart + commonPrefix;
              setInputValue(parts.join(' '));
            }
            if (currentRepeatCount >= 2) {
              appendHistory([{ type: 'output', content: matches.join('  ') }]);
            }
          }
        }
      }
      return;
    }

    if (lastTabToken && e.key !== 'Tab') {
      setLastTabToken('');
      setTabRepeatCount(0);
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const switchTab = (tabId: number) => {
    if (tabId === activeTabId) return;
    setActiveTabId(tabId);
    loadTabState(tabId);
  };

  const addNewTab = () => {
    const nextId = tabs.length ? Math.max(...tabs.map((t) => t.id)) + 1 : 1;
    const nextTab: TerminalTab = {
      id: nextId,
      label: `Tab ${tabs.length + 1}`,
    };
    setTabs((prev) => [...prev, nextTab]);
    setActiveTabId(nextId);
    resetSession();
  };

  const activeTheme =
    terminalThemes.find((theme) => theme.name === selectedTheme) ||
    terminalThemes[0];
  const shellUser = isRoot ? 'root' : 'zis3c';
  const shellHost = 'kali';
  const promptChar = isRoot ? '# ' : '$ ';
  const promptPath = currentPath;

  return (
    <Styled.TerminalWrapper style={activeTheme.vars}>
      {/* xfce4-terminal menu bar */}
      <Styled.MenuBar>
        <Styled.MenuItems>
          <Styled.MenuItem>File</Styled.MenuItem>
          <Styled.MenuItem>Edit</Styled.MenuItem>
          <Styled.MenuItem>View</Styled.MenuItem>
          <Styled.MenuItem>Terminal</Styled.MenuItem>
          <Styled.MenuItem>Tabs</Styled.MenuItem>
          <Styled.MenuItem>Help</Styled.MenuItem>
        </Styled.MenuItems>
        <Styled.ThemeSelect
          aria-label="Terminal Theme"
          value={selectedTheme}
          onChange={(e) => setSelectedTheme(e.target.value)}
        >
          {terminalThemes.map((theme) => (
            <option key={theme.name} value={theme.name}>
              {theme.name}
            </option>
          ))}
        </Styled.ThemeSelect>
      </Styled.MenuBar>
      <Styled.TabStrip>
        {tabs.map((tab) => (
          <Styled.TabButton
            key={tab.id}
            isActive={tab.id === activeTabId}
            onClick={() => switchTab(tab.id)}
          >
            {tab.label}
          </Styled.TabButton>
        ))}
        <Styled.AddTabButton onClick={addNewTab} title="New Tab">
          +
        </Styled.AddTabButton>
      </Styled.TabStrip>

      <Styled.Container ref={containerRef} onClick={handleContainerClick}>
        {history.map((line, index) => (
          <Styled.Line key={index}>
            {line.type === 'input' && (
              <>
                <Styled.PromptUser>
                  {line.promptUser || 'zis3c@kali'}
                </Styled.PromptUser>
                <Styled.PromptSep>:</Styled.PromptSep>
                <Styled.PromptPath>
                  {line.promptPath ?? currentPath}
                </Styled.PromptPath>
                <Styled.PromptDollar>
                  {line.promptChar || '$ '}
                </Styled.PromptDollar>
                <Styled.Command>{line.content}</Styled.Command>
              </>
            )}
            {line.type === 'output' && (
              <Styled.Output>{line.content}</Styled.Output>
            )}
            {line.type === 'error' && (
              <Styled.ErrorOutput>{line.content}</Styled.ErrorOutput>
            )}
          </Styled.Line>
        ))}

        <Styled.InputLine>
          {isAwaitingSudoPassword ? (
            <Styled.Output>[sudo] password for zis3c: </Styled.Output>
          ) : (
            <>
              <Styled.PromptUser>{`${shellUser}@${shellHost}`}</Styled.PromptUser>
              <Styled.PromptSep>:</Styled.PromptSep>
              <Styled.PromptPath>{promptPath}</Styled.PromptPath>
              <Styled.PromptDollar>{promptChar}</Styled.PromptDollar>
            </>
          )}
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Styled.Input
              ref={inputRef}
              value={inputValue}
              isMasked={isAwaitingSudoPassword}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </Styled.InputLine>
      </Styled.Container>
      <Styled.StatusBar>
        <span>UTF-8</span>
        <span>{`rows ${Math.max(
          24,
          Math.floor((containerRef.current?.clientHeight || 432) / 18)
        )}`}</span>
        <span>{`cols ${Math.max(
          80,
          Math.floor((containerRef.current?.clientWidth || 720) / 8)
        )}`}</span>
        <span>100%</span>
      </Styled.StatusBar>
    </Styled.TerminalWrapper>
  );
};

export default Terminal;
