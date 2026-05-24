import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

interface Props {
  searchQuery?: string;
}

const DEFAULT_URL = 'https://www.google.com/webhp?igu=1';

const GoogleSearch = ({ searchQuery }: Props): JSX.Element => {
  const initialUrl = searchQuery
    ? `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`
    : DEFAULT_URL;

  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [inputValue, setInputValue] = useState(initialUrl);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const currentUrl = history[historyIndex];

  const normalizedUrl = (raw: string) => {
    const value = raw.trim();
    if (!value) return currentUrl;
    if (/^https?:\/\//i.test(value)) return value;
    if (value.includes(' ')) {
      return `https://www.google.com/search?q=${encodeURIComponent(value)}`;
    }
    return `https://${value}`;
  };

  const commitNavigate = (value: string) => {
    const next = normalizedUrl(value);
    const base = history.slice(0, historyIndex + 1);
    base.push(next);
    setHistory(base);
    setHistoryIndex(base.length - 1);
    setInputValue(next);
    setShowSuggestions(false);
  };

  const suggestions = useMemo(() => {
    const q = inputValue.toLowerCase();
    if (!q) return [];
    return Array.from(
      new Set(history.filter((h) => h.toLowerCase().includes(q)))
    )
      .slice(-6)
      .reverse();
  }, [history, inputValue]);

  return (
    <Container>
      <TopBar>
        <TabStrip>
          <Tab active>
            <FavDot />
            New Tab
          </Tab>
          <TabButton title="New Tab">+</TabButton>
        </TabStrip>

        <NavRow>
          <NavBtn
            disabled={historyIndex <= 0}
            onClick={() => {
              if (historyIndex <= 0) return;
              const next = historyIndex - 1;
              setHistoryIndex(next);
              setInputValue(history[next]);
            }}
          >
            {'<'}
          </NavBtn>
          <NavBtn
            disabled={historyIndex >= history.length - 1}
            onClick={() => {
              if (historyIndex >= history.length - 1) return;
              const next = historyIndex + 1;
              setHistoryIndex(next);
              setInputValue(history[next]);
            }}
          >
            {'>'}
          </NavBtn>

          <AddressWrap>
            <AddressBar
              value={inputValue}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitNavigate(inputValue);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <Suggestions>
                {suggestions.map((s) => (
                  <SuggestionItem
                    key={s}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      commitNavigate(s);
                    }}
                  >
                    {s}
                  </SuggestionItem>
                ))}
              </Suggestions>
            )}
          </AddressWrap>

          <GoBtn onClick={() => commitNavigate(inputValue)}>Go</GoBtn>
        </NavRow>
      </TopBar>

      <Frame src={currentUrl} title="Google Chrome" />
    </Container>
  );
};

export default GoogleSearch;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #202124;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  background: #2b2f34;
  border-bottom: 1px solid #111318;
`;

const TabStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 0;
`;

const Tab = styled.div<{ active?: boolean }>`
  height: 24px;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px;
  border-radius: 8px 8px 0 0;
  background: ${({ active }) => (active ? '#353a40' : 'transparent')};
  color: rgba(220, 224, 230, 0.92);
  font-size: 11px;
`;

const FavDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4aa3ff;
`;

const TabButton = styled.button`
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  color: rgba(220, 224, 230, 0.85);
  cursor: pointer;
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px 7px;
`;

const NavBtn = styled.button<{ disabled?: boolean }>`
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: ${({ disabled }) =>
    disabled ? 'rgba(180,185,195,0.35)' : 'rgba(215,220,226,0.88)'};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const AddressWrap = styled.div`
  position: relative;
  flex: 1;
`;

const AddressBar = styled.input`
  width: 100%;
  height: 28px;
  border: 1px solid #424851;
  border-radius: 14px;
  background: #1f2227;
  color: #e1e6ec;
  padding: 0 12px;
  font-size: 11px;
  outline: none;

  &:focus {
    border-color: #5f8ecb;
  }
`;

const Suggestions = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: 0;
  background: #252a30;
  border: 1px solid #3a414b;
  z-index: 20;
`;

const SuggestionItem = styled.div`
  padding: 6px 10px;
  font-size: 11px;
  color: rgba(220, 224, 230, 0.92);
  cursor: pointer;

  &:hover {
    background: rgba(95, 142, 203, 0.3);
  }
`;

const GoBtn = styled.button`
  height: 26px;
  min-width: 40px;
  border: 1px solid #4a5665;
  background: #334155;
  color: #e1e6ec;
  font-size: 11px;
  cursor: pointer;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
`;
