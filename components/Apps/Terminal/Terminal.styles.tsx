import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`;

export const TerminalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: var(--terminal-bg, #1a1b26);
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  background: var(--terminal-menu-bg, #24263a);
  border-bottom: 1px solid var(--terminal-menu-border, #1a1b26);
  padding: 0 4px 0 2px;
  flex-shrink: 0;
`;

export const MenuItems = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuItem = styled.span`
  padding: 2px 8px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 11px;
  color: rgba(180, 185, 195, 0.85);
  cursor: default;
  border-radius: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const ThemeSelect = styled.select`
  height: 18px;
  min-width: 122px;
  border: 1px solid rgba(94, 102, 112, 0.55);
  background: rgba(18, 20, 28, 0.92);
  color: rgba(210, 215, 220, 0.92);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10px;
  padding: 0 4px;
  outline: none;
`;

export const TabStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  padding: 2px 4px;
  background: rgba(8, 10, 15, 0.3);
  border-bottom: 1px solid var(--terminal-menu-border, #141621);
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  min-width: 84px;
  height: 20px;
  padding: 0 8px;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'rgba(128, 146, 170, 0.7)' : 'rgba(88, 96, 112, 0.45)'};
  background: ${({ isActive }) =>
    isActive ? 'rgba(56, 76, 104, 0.55)' : 'rgba(20, 24, 34, 0.6)'};
  color: rgba(210, 216, 224, 0.92);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10px;
  cursor: pointer;
  text-align: left;
`;

export const AddTabButton = styled.button`
  width: 22px;
  height: 20px;
  border: 1px solid rgba(88, 96, 112, 0.45);
  background: rgba(20, 24, 34, 0.6);
  color: rgba(210, 216, 224, 0.92);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 12px;
  cursor: pointer;
`;

export const Container = styled.div`
  flex: 1;
  padding: 8px 10px;
  overflow-y: auto;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  background: var(--terminal-bg, #1a1b26);
  cursor: text;
  color: var(--terminal-output, rgba(190, 195, 200, 0.85));
`;

export const Line = styled.div`
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 18px;
  display: flex;
  flex-wrap: wrap;
`;

export const Prompt = styled.span`
  color: rgba(180, 190, 200, 0.85);
  white-space: pre;
`;

/* Colored prompt parts */
export const PromptUser = styled.span`
  color: var(--terminal-prompt-user, #55cc55);
  font-weight: bold;
  white-space: pre;
`;

export const PromptSep = styled.span`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre;
`;

export const PromptPath = styled.span`
  color: var(--terminal-prompt-path, #5588dd);
  font-weight: bold;
  white-space: pre;
`;

export const PromptDollar = styled.span`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre;
`;

export const Command = styled.span`
  color: var(--terminal-command, rgba(210, 215, 220, 0.9));
`;

export const Output = styled.span`
  color: var(--terminal-output, rgba(190, 195, 200, 0.85));
  white-space: pre-wrap;
  display: block;
`;

export const ErrorOutput = styled.span`
  color: var(--terminal-error, #cc5555);
  white-space: pre-wrap;
  display: block;
`;

export const InputLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 18px;
`;

export const Input = styled.input<{ isMasked?: boolean }>`
  background: transparent;
  border: none;
  outline: none;
  color: var(--terminal-command, rgba(210, 215, 220, 0.9));
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  width: 100%;
  caret-color: var(--terminal-prompt-user, #55cc55);
  ${({ isMasked }) =>
    isMasked
      ? `
    color: transparent;
    text-shadow: none;
  `
      : ''}
`;

export const Cursor = styled.span`
  width: 7px;
  height: 14px;
  margin-left: 1px;
  background: var(--terminal-cursor, #55cc55);
  animation: ${blink} 1s steps(1, end) infinite;
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  height: 18px;
  padding: 0 8px;
  background: var(--terminal-status-bg, #12131b);
  border-top: 1px solid var(--terminal-menu-border, #1a1b26);
  color: var(--terminal-status-text, rgba(160, 168, 180, 0.85));
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10px;
`;
