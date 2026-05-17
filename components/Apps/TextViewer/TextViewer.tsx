import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as Styled from './TextViewer.styles';
import { resolvePath, writeFile } from '../../../utils/filesystem';

interface TextViewerProps {
  content: string;
  filename?: string;
  filepath?: string;
}

const TextViewer = ({
  content,
  filename = 'untitled',
  filepath,
}: TextViewerProps): JSX.Element => {
  const [text, setText] = useState(content);
  const [search, setSearch] = useState('');
  const [replaceValue, setReplaceValue] = useState('');
  const [showReplace, setShowReplace] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [status, setStatus] = useState('Ready');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const lineCount = text.split('\n').length;
  const charCount = text.length;

  const targetPath = useMemo(() => {
    if (filepath) return filepath;
    if (!filename || filename === 'untitled') return null;
    return resolvePath('/home/zis3c', filename);
  }, [filepath, filename]);

  const matches = useMemo(() => {
    if (!search.trim()) return [];
    const found: number[] = [];
    const needle = search.toLowerCase();
    const hay = text.toLowerCase();
    let index = 0;
    while (index < hay.length) {
      const i = hay.indexOf(needle, index);
      if (i === -1) break;
      found.push(i);
      index = i + needle.length;
    }
    return found;
  }, [search, text]);

  const moveToMatch = (direction: 1 | -1) => {
    if (!matches.length || !search.trim()) return;

    const currentPos = editorRef.current?.selectionStart ?? cursorIndex;
    let nextIndex = -1;

    if (direction === 1) {
      nextIndex = matches.find((m) => m > currentPos) ?? matches[0];
    } else {
      const reversed = [...matches].reverse();
      nextIndex = reversed.find((m) => m < currentPos) ?? reversed[0];
    }

    const end = nextIndex + search.length;
    setCursorIndex(nextIndex);

    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.setSelectionRange(nextIndex, end);
    }
  };

  const handleSave = useCallback(() => {
    if (!targetPath) {
      setStatus('No writable path');
      return;
    }
    const ok = writeFile(targetPath, text);
    setStatus(ok ? `Saved: ${targetPath}` : 'Save failed');
  }, [targetPath, text]);

  const replaceNext = () => {
    if (!search) return;
    const i = text.toLowerCase().indexOf(search.toLowerCase(), cursorIndex);
    if (i === -1) {
      setStatus('No next match');
      return;
    }
    const nextText =
      text.slice(0, i) + replaceValue + text.slice(i + search.length);
    setText(nextText);
    setCursorIndex(i + replaceValue.length);
    setStatus('Replaced one match');
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!e.ctrlKey) return;
      const key = e.key.toLowerCase();
      if (key === 's') {
        e.preventDefault();
        handleSave();
      }
      if (key === 'f') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (key === 'h') {
        e.preventDefault();
        setShowReplace((p) => !p);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSave]);

  return (
    <Styled.ViewerWrapper>
      <Styled.MenuBar>
        <Styled.MenuItem>File</Styled.MenuItem>
        <Styled.MenuItem>Edit</Styled.MenuItem>
        <Styled.MenuItem>Search</Styled.MenuItem>
        <Styled.MenuItem>View</Styled.MenuItem>
        <Styled.MenuItem>Document</Styled.MenuItem>
        <Styled.MenuItem>Help</Styled.MenuItem>
      </Styled.MenuBar>

      <Styled.ToolBar>
        <Styled.ToolButton type="button" title="Save" onClick={handleSave}>
          Save
        </Styled.ToolButton>
        <Styled.ToolSep />
        <Styled.ToolButton type="button" title="Find Previous" onClick={() => moveToMatch(-1)}>
          Prev
        </Styled.ToolButton>
        <Styled.ToolButton type="button" title="Find Next" onClick={() => moveToMatch(1)}>
          Next
        </Styled.ToolButton>
        <Styled.SearchInput
          ref={searchRef}
          type="text"
          placeholder="Find..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {showReplace && (
          <Styled.SearchInput
            type="text"
            placeholder="Replace..."
            value={replaceValue}
            onChange={(e) => setReplaceValue(e.target.value)}
          />
        )}
        <Styled.MatchInfo>
          {search ? `${matches.length} match(es)` : ''}
        </Styled.MatchInfo>
        {showReplace && (
          <Styled.ToolButton type="button" onClick={replaceNext}>
            Replace
          </Styled.ToolButton>
        )}
      </Styled.ToolBar>

      <Styled.ContentArea>
        <Styled.LineNumbers>
          {Array.from({ length: lineCount }, (_, i) => (
            <Styled.LineNumber key={i}>{i + 1}</Styled.LineNumber>
          ))}
        </Styled.LineNumbers>

        <Styled.TextEditor
          ref={editorRef}
          value={text}
          spellCheck={false}
          onChange={(e) => setText(e.target.value)}
          onClick={(e) => setCursorIndex(e.currentTarget.selectionStart)}
          onKeyUp={(e) => setCursorIndex(e.currentTarget.selectionStart)}
        />
      </Styled.ContentArea>

      <Styled.StatusBar>
        <Styled.StatusItem>{status}</Styled.StatusItem>
        <Styled.StatusItem>
          {filename} - {lineCount} lines, {charCount} chars | UTF-8
        </Styled.StatusItem>
      </Styled.StatusBar>
    </Styled.ViewerWrapper>
  );
};

export default TextViewer;
