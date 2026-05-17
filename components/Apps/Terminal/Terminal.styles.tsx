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
  background: #1a1b26;
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  background: #24263a;
  border-bottom: 1px solid #1a1b26;
  padding: 0 2px;
  flex-shrink: 0;
`;

export const MenuItem = styled.span`
  padding: 2px 8px;
  font-family: 'Inter', 'Noto Sans', sans-serif;
  font-size: 11px;
  color: rgba(180, 185, 195, 0.85);
  cursor: default;
  border-radius: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

export const Container = styled.div`
  flex: 1;
  padding: 8px 10px;
  overflow-y: auto;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  background: #1a1b26;
  cursor: text;
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
  color: #55cc55;
  font-weight: bold;
  white-space: pre;
`;

export const PromptSep = styled.span`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre;
`;

export const PromptPath = styled.span`
  color: #5588dd;
  font-weight: bold;
  white-space: pre;
`;

export const PromptDollar = styled.span`
  color: rgba(200, 205, 210, 0.9);
  white-space: pre;
`;

export const Command = styled.span`
  color: rgba(210, 215, 220, 0.9);
`;

export const Output = styled.span`
  color: rgba(190, 195, 200, 0.85);
  white-space: pre-wrap;
  display: block;
`;

export const ErrorOutput = styled.span`
  color: #cc5555;
  white-space: pre-wrap;
  display: block;
`;

export const InputLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 18px;
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: rgba(210, 215, 220, 0.9);
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 12px;
  width: 100%;
  caret-color: #55cc55;
`;
