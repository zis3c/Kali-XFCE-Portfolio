import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useActions } from '../../../hooks/useActions';
import {
  HomeIcon,
  DesktopIcon,
  DocumentIcon,
  FolderIcon,
  DownloadIcon,
  TextFileIcon,
  PdfFileIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
} from '../../icons/KaliIcons';
import TextViewerComponent from '../TextViewer/TextViewer';
import {
  findNode,
  toTildePath,
  FsNode,
  createDir,
  renameNode,
  deleteNode,
} from '../../../utils/filesystem';
import { notifyDesktop } from '../../../utils/notifications';

interface FileManagerProps {
  startPath?: string;
}

const FileManager = ({ startPath = '/home/zis3c' }: FileManagerProps): JSX.Element => {
  const { openWindow } = useActions();
  const [currentPath, setCurrentPath] = useState(startPath);
  const [history, setHistory] = useState<string[]>([startPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [status, setStatus] = useState('Ready');

  const sidebarItems = [
    { name: 'Home', icon: <HomeIcon size={14} />, path: '/home/zis3c' },
    { name: 'Desktop', icon: <DesktopIcon size={14} />, path: '/home/zis3c/Desktop' },
    { name: 'Documents', icon: <DocumentIcon size={14} />, path: '/home/zis3c/Documents' },
    { name: 'Downloads', icon: <DownloadIcon size={14} />, path: '/home/zis3c/Downloads' },
    { name: 'Projects', icon: <FolderIcon size={14} />, path: '/home/zis3c/Projects' },
    { name: 'File System', icon: <FolderIcon size={14} />, path: '/' },
    { name: 'Trash', icon: <FolderIcon size={14} />, path: '/home/zis3c/.local/share/Trash' },
  ];

  const navigateTo = useCallback(
    (path: string) => {
      setCurrentPath(path);
      setSelectedFile(null);
      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(path);
        return newHistory;
      });
      setHistoryIndex((prev) => prev + 1);
    },
    [historyIndex]
  );

  const refreshCurrent = () => setCurrentPath((p) => `${p}`);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedFile(null);
    }
  }, [history, historyIndex]);

  const goUp = useCallback(() => {
    const parent = currentPath.split('/').slice(0, -1).join('/');
    if (parent) navigateTo(parent);
  }, [currentPath, navigateTo]);

  const openFileContent = (name: string, content: string, fullPath: string) => {
    openWindow({
      windowName: `${name} - Mousepad`,
      isOpen: true,
      windowIcon: 'KALI_TEXTFILE',
      size: { width: 560, height: 420 },
      windowContent: (
        <TextViewerComponent content={content} filename={name} filepath={fullPath} />
      ),
    });
  };

  const handleFileAction = (node: FsNode, fullPath: string) => {
    if (node.type === 'dir') {
      navigateTo(fullPath);
      return;
    }
    const name = node.name;
    if (node.content) {
      openFileContent(name, node.content, fullPath);
    } else if (name === 'resume.pdf') {
      openFileContent(
        name,
        'resume.pdf - binary file\nUse "open resume" in terminal or double-click in Thunar to view.',
        fullPath
      );
    }
  };

  const getIcon = (node: FsNode) => {
    if (node.type === 'dir') return <FolderIcon size={32} color="#c4a661" />;
    if (node.name.endsWith('.pdf')) return <PdfFileIcon size={32} color="#aa5555" />;
    return <TextFileIcon size={32} color="#8899aa" />;
  };

  const makeFullPath = (name: string) =>
    currentPath === '/' ? `/${name}` : `${currentPath}/${name}`;

  const handleNewFolder = () => {
    const folderName = window.prompt('New folder name:', 'New Folder');
    if (!folderName) return;
    const ok = createDir(makeFullPath(folderName));
    setStatus(ok ? `Folder created: ${folderName}` : 'Create folder failed');
    notifyDesktop({
      title: 'Thunar File Manager',
      message: ok ? `Created folder '${folderName}'` : 'Failed to create folder',
    });
    refreshCurrent();
  };

  const handleRename = () => {
    if (!selectedFile) return;
    const nextName = window.prompt('Rename to:', selectedFile);
    if (!nextName || nextName === selectedFile) return;
    const ok = renameNode(makeFullPath(selectedFile), nextName);
    setStatus(ok ? `Renamed to: ${nextName}` : 'Rename failed');
    notifyDesktop({
      title: 'Thunar File Manager',
      message: ok ? `Renamed to '${nextName}'` : 'Rename failed',
    });
    if (ok) setSelectedFile(nextName);
    refreshCurrent();
  };

  const handleDelete = () => {
    if (!selectedFile) return;
    const yes = window.confirm(`Delete '${selectedFile}'?`);
    if (!yes) return;
    const ok = deleteNode(makeFullPath(selectedFile));
    setStatus(ok ? `Deleted: ${selectedFile}` : 'Delete failed (non-empty folder?)');
    notifyDesktop({
      title: 'Thunar File Manager',
      message: ok ? `Deleted '${selectedFile}'` : 'Delete failed (folder not empty?)',
    });
    if (ok) setSelectedFile(null);
    refreshCurrent();
  };

  const currentNode = findNode(currentPath);
  const items = currentNode?.type === 'dir' && currentNode.children ? currentNode.children : [];

  return (
    <Container>
      <FmMenuBar>
        <FmMenuItem>File</FmMenuItem>
        <FmMenuItem>Edit</FmMenuItem>
        <FmMenuItem>Go</FmMenuItem>
        <FmMenuItem>View</FmMenuItem>
        <FmMenuItem>Help</FmMenuItem>
      </FmMenuBar>

      <Toolbar>
        <NavButton onClick={goBack} title="Go back" disabled={historyIndex <= 0}>
          <ArrowLeftIcon size={14} />
        </NavButton>
        <NavButton onClick={goUp} title="Go up" disabled={currentPath === '/'}>
          <ArrowUpIcon size={14} />
        </NavButton>
        <NavButton onClick={() => navigateTo('/home/zis3c')} title="Home">
          <HomeIcon size={14} />
        </NavButton>
        <ActionButton onClick={handleNewFolder}>New Folder</ActionButton>
        <ActionButton onClick={handleRename} disabled={!selectedFile}>Rename</ActionButton>
        <ActionButton onClick={handleDelete} disabled={!selectedFile}>Delete</ActionButton>
        <PathBar>{currentPath}</PathBar>
      </Toolbar>

      <Body>
        <Sidebar>
          <SidebarLabel>PLACES</SidebarLabel>
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.name}
              isActive={currentPath === item.path}
              onClick={() => navigateTo(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarItem>
          ))}
        </Sidebar>

        <FileArea onClick={() => setSelectedFile(null)}>
          {items.length === 0 && <EmptyMessage>Folder is empty</EmptyMessage>}
          {items.map((node) => {
            const fullPath = makeFullPath(node.name);
            return (
              <FileEntry
                key={node.name}
                isSelected={selectedFile === node.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(node.name);
                }}
                onDoubleClick={() => handleFileAction(node, fullPath)}
              >
                <FileIcon>{getIcon(node)}</FileIcon>
                <FileName>{node.name}</FileName>
              </FileEntry>
            );
          })}
        </FileArea>
      </Body>

      <StatusBar>
        <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
        <span>{status} | {toTildePath(currentPath)}</span>
      </StatusBar>
    </Container>
  );
};

export default FileManager;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Inter', sans-serif;
  background: ${({ theme }) => theme.kali.fileManager.contentBg};
`;

const FmMenuBar = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  background: ${({ theme }) => theme.kali.fileManager.toolbarBg};
  border-bottom: 1px solid ${({ theme }) => theme.kali.fileManager.borderColor};
  padding: 0 2px;
  flex-shrink: 0;
`;

const FmMenuItem = styled.span`
  padding: 2px 8px;
  font-size: 11px;
  color: rgba(180, 185, 195, 0.85);
  cursor: default;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 2px 4px;
  background: ${({ theme }) => theme.kali.fileManager.toolbarBg};
  border-bottom: 1px solid ${({ theme }) => theme.kali.fileManager.borderColor};
  min-height: 28px;
`;

const NavButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme }) => theme.primary.text};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};

  &:hover {
    background: ${({ disabled, theme }) =>
      disabled ? 'transparent' : theme.kali.fileManager.sidebarHover};
  }
`;

const ActionButton = styled.button<{ disabled?: boolean }>`
  height: 22px;
  padding: 0 8px;
  font-size: 10px;
  color: ${({ disabled }) => (disabled ? 'rgba(180,185,195,0.45)' : 'rgba(200,205,215,0.95)')};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(100, 120, 140, 0.35);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? 'rgba(255,255,255,0.04)' : 'rgba(106,154,222,0.2)'};
  }
`;

const PathBar = styled.div`
  flex: 1;
  padding: 3px 6px;
  background: ${({ theme }) => theme.kali.fileManager.pathBg};
  border: 1px solid ${({ theme }) => theme.kali.fileManager.borderColor};
  border-radius: 0;
  color: ${({ theme }) => theme.primary.text};
  font-size: 10.5px;
  font-family: 'Inter', 'Noto Sans', sans-serif;
  margin-left: 2px;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 140px;
  min-width: 140px;
  background: ${({ theme }) => theme.kali.fileManager.sidebarBg};
  border-right: 1px solid ${({ theme }) => theme.kali.fileManager.borderColor};
  padding: 4px 0;
  overflow-y: auto;
`;

const SidebarLabel = styled.div`
  padding: 4px 10px 6px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(160, 170, 180, 0.5);
`;

interface SidebarItemProps {
  isActive: boolean;
}

const SidebarItem = styled.button<SidebarItemProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 5px 10px;
  background: ${({ isActive, theme }) =>
    isActive ? theme.kali.fileManager.sidebarActive : 'transparent'};
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary.text};
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  text-align: left;
  transition: background 0.12s ease;

  &:hover {
    background: ${({ theme }) => theme.kali.fileManager.sidebarHover};
  }
`;

const FileArea = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  grid-auto-rows: min-content;
  gap: 4px;
  padding: 10px;
  overflow-y: auto;
  align-content: start;
`;

const EmptyMessage = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px;
  color: rgba(160, 170, 180, 0.4);
  font-size: 12px;
  font-style: italic;
`;

const FileEntry = styled.div<{ isSelected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 4px;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.12s ease;
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(54, 123, 240, 0.3)' : 'transparent'};
  border: 1px solid
    ${({ isSelected }) =>
      isSelected ? 'rgba(54, 123, 240, 0.5)' : 'transparent'};

  &:hover {
    background: ${({ isSelected, theme }) =>
      isSelected ? 'rgba(54, 123, 240, 0.4)' : theme.kali.fileManager.fileHover};
  }
`;

const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;

const FileName = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.primary.text};
  text-align: center;
  word-break: break-all;
  line-height: 1.3;
`;

const StatusBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 10px;
  background: ${({ theme }) => theme.kali.fileManager.toolbarBg};
  border-top: 1px solid ${({ theme }) => theme.kali.fileManager.borderColor};
  font-size: 10px;
  color: rgba(160, 170, 180, 0.6);
`;
