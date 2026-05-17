import styled from 'styled-components';

export const ViewerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #1e1e2e;
  font-family: 'Noto Sans', 'DejaVu Sans', 'Liberation Sans', sans-serif;
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  background: #2b2b3c;
  border-bottom: 1px solid #1a1a2a;
  padding: 0 4px;
  flex-shrink: 0;
`;

export const MenuItem = styled.span`
  color: #cdd6f4;
  font-size: 12px;
  padding: 2px 8px;
  cursor: default;
  border-radius: 3px;
  user-select: none;

  &:hover {
    background: rgba(137, 180, 250, 0.15);
  }
`;

export const ToolBar = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  background: #2b2b3c;
  border-bottom: 1px solid #1a1a2a;
  padding: 0 6px;
  gap: 4px;
  flex-shrink: 0;
`;

export const ToolButton = styled.button`
  background: transparent;
  border: 1px solid #3b3b4f;
  color: #cdd6f4;
  font-size: 11px;
  padding: 2px 6px;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    background: rgba(137, 180, 250, 0.15);
  }
`;

export const ToolSep = styled.div`
  width: 1px;
  height: 18px;
  background: #3b3b4f;
  margin: 0 3px;
`;

export const SearchInput = styled.input`
  width: 160px;
  height: 22px;
  background: #141422;
  border: 1px solid #3b3b4f;
  color: #cdd6f4;
  font-size: 11px;
  padding: 0 6px;
  outline: none;

  &:focus {
    border-color: #6a9ade;
  }
`;

export const MatchInfo = styled.span`
  color: #8899aa;
  font-size: 11px;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const LineNumbers = styled.div`
  background: #1a1a28;
  color: #585b70;
  font-family: 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  padding: 8px 0;
  text-align: right;
  user-select: none;
  min-width: 42px;
  border-right: 1px solid #2b2b3c;
  overflow: hidden;
`;

export const LineNumber = styled.div`
  padding: 0 8px 0 4px;
`;

export const TextEditor = styled.textarea`
  flex: 1;
  margin: 0;
  padding: 8px 12px;
  color: #cdd6f4;
  font-family: 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  border: 0;
  outline: none;
  resize: none;
  overflow: auto;
  white-space: pre;
  background: #1e1e2e;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a28;
  }

  &::-webkit-scrollbar-thumb {
    background: #3b3b4f;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #4b4b5f;
  }
`;

export const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;
  background: #2b2b3c;
  border-top: 1px solid #1a1a2a;
  padding: 0 8px;
  flex-shrink: 0;
`;

export const StatusItem = styled.span`
  color: #6c7086;
  font-size: 11px;
  user-select: none;
`;
