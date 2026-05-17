import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Styled from './Terminal.styles';
import { useTerminalCommands } from './Terminal.config';
import { listDir, resolvePath } from '../../../utils/filesystem';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
  /** The path at the time this line was entered (for accurate prompt rendering) */
  promptPath?: string;
}

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
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { executeCommand } = useTerminalCommands();

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
    setHistory([
      {
        type: 'output',
        content: `Last login: ${loginDate} on tty7\nType 'help' for available commands.`,
      },
    ]);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cmd = inputValue.trim();

    // Empty enter — just echo prompt
    if (!cmd) {
      setHistory((prev) => [
        ...prev,
        { type: 'input', content: '', promptPath: currentPath },
      ]);
      setInputValue('');
      return;
    }

    // !! — repeat last command
    if (cmd === '!!') {
      if (commandHistory.length > 0) {
        cmd = commandHistory[0];
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'input', content: '!!', promptPath: currentPath },
          { type: 'error', content: 'bash: !!: event not found' },
        ]);
        setInputValue('');
        return;
      }
    }

    setCommandHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      { type: 'input', content: cmd, promptPath: currentPath },
    ];

    // Handle clear specially
    if (cmd === 'clear') {
      setHistory([]);
      setInputValue('');
      return;
    }

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
        return;
      }

      const { lines, newPath } = runSingleCommand(trimmed, activePath);
      activePath = newPath;
      newLines.push(...lines);
    }

    setCurrentPath(activePath);
    setHistory((prev) => [...prev, ...newLines]);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

      // Known commands for first-word completion
      const knownCommands = [
        'help', 'clear', 'pwd', 'whoami', 'hostname', 'date', 'uname',
        'uptime', 'echo', 'history', 'ls', 'cd', 'cat', 'open', 'skills',
        'projects', 'neofetch', 'fastfetch', 'free', 'df', 'who',
        'lsb_release', 'nmap', 'wireshark', 'msfconsole', 'aircrack-ng',
        'tree', 'sudo', 'exit', 'id', 'ifconfig', 'ip', 'ping', 'man',
        'which', 'type', 'alias', 'env', 'export', 'ps', 'grep', 'find',
        'wc', 'head', 'tail', 'sort', 'chmod', 'chown', 'file', 'stat',
        'du', 'mount', 'touch', 'mkdir', 'rm', 'cp', 'mv',
      ];

      const parts = val.split(/\s+/);
      if (parts.length <= 1) {
        // Complete command name
        const prefix = parts[0];
        const matches = knownCommands.filter((c) => c.startsWith(prefix));
        if (matches.length === 1) {
          setInputValue(matches[0] + ' ');
        } else if (matches.length > 1) {
          // Show possibilities
          setHistory((prev) => [
            ...prev,
            { type: 'input', content: val, promptPath: currentPath },
            { type: 'output', content: matches.join('  ') },
          ]);
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
            const isDirectory = entries.find(
              (e) => e === matches[0] + '/'
            );
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
            setHistory((prev) => [
              ...prev,
              { type: 'input', content: val, promptPath: currentPath },
              { type: 'output', content: matches.join('  ') },
            ]);
          }
        }
      }
      return;
    }
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <Styled.TerminalWrapper>
      {/* xfce4-terminal menu bar */}
      <Styled.MenuBar>
        <Styled.MenuItem>File</Styled.MenuItem>
        <Styled.MenuItem>Edit</Styled.MenuItem>
        <Styled.MenuItem>View</Styled.MenuItem>
        <Styled.MenuItem>Terminal</Styled.MenuItem>
        <Styled.MenuItem>Tabs</Styled.MenuItem>
        <Styled.MenuItem>Help</Styled.MenuItem>
      </Styled.MenuBar>

      <Styled.Container ref={containerRef} onClick={handleContainerClick}>
        {history.map((line, index) => (
          <Styled.Line key={index}>
            {line.type === 'input' && (
              <>
                <Styled.PromptUser>zis3c@kali</Styled.PromptUser>
                <Styled.PromptSep>:</Styled.PromptSep>
                <Styled.PromptPath>
                  {line.promptPath ?? currentPath}
                </Styled.PromptPath>
                <Styled.PromptDollar>$ </Styled.PromptDollar>
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
          <Styled.PromptUser>zis3c@kali</Styled.PromptUser>
          <Styled.PromptSep>:</Styled.PromptSep>
          <Styled.PromptPath>{currentPath}</Styled.PromptPath>
          <Styled.PromptDollar>$ </Styled.PromptDollar>
          <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Styled.Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </Styled.InputLine>
      </Styled.Container>
    </Styled.TerminalWrapper>
  );
};

export default Terminal;
