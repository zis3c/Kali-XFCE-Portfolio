import {
  resolvePath,
  findNode,
  listDir,
  listDirLong,
  readFile,
  writeFile,
  createDir,
  renameNode,
  deleteNode,
  isDir,
  toTildePath,
} from './filesystem';

describe('filesystem', () => {
  /* ---- resolvePath ---- */
  describe('resolvePath', () => {
    it('resolves ~ to /home/zis3c', () => {
      expect(resolvePath('/', '~')).toBe('/home/zis3c');
    });

    it('resolves ~/Projects relative', () => {
      expect(resolvePath('/home/zis3c', '~/Projects')).toBe('/home/zis3c/Projects');
    });

    it('resolves relative paths from cwd', () => {
      expect(resolvePath('/home/zis3c', 'Documents')).toBe('/home/zis3c/Documents');
    });

    it('resolves absolute paths unchanged', () => {
      expect(resolvePath('/whatever', '/home/zis3c')).toBe('/home/zis3c');
    });

    it('normalizes .. segments', () => {
      expect(resolvePath('/home/zis3c/Projects', '..')).toBe('/home/zis3c');
    });

    it('normalizes redundant . segments', () => {
      expect(resolvePath('/home/zis3c', '././Documents')).toBe('/home/zis3c/Documents');
    });
  });

  /* ---- findNode ---- */
  describe('findNode', () => {
    it('returns root for /', () => {
      const root = findNode('/');
      expect(root).not.toBeNull();
      expect(root!.name).toBe('/');
      expect(root!.type).toBe('dir');
    });

    it('finds a file by absolute path', () => {
      const node = findNode('/home/zis3c/about.txt');
      expect(node).not.toBeNull();
      expect(node!.name).toBe('about.txt');
      expect(node!.type).toBe('file');
    });

    it('finds a directory by absolute path', () => {
      const node = findNode('/home/zis3c/Projects');
      expect(node).not.toBeNull();
      expect(node!.name).toBe('Projects');
      expect(node!.type).toBe('dir');
    });

    it('returns null for non-existent path', () => {
      expect(findNode('/home/zis3c/nonexistent')).toBeNull();
    });
  });

  /* ---- listDir / listDirLong ---- */
  describe('listDir', () => {
    it('lists home directory contents', () => {
      const items = listDir('/home/zis3c');
      expect(items).not.toBeNull();
      expect(items!).toContain('about.txt');
      expect(items!).toContain('Documents/');
      expect(items!).toContain('Projects/');
    });

    it('returns null for non-existent directory', () => {
      expect(listDir('/home/zis3c/fake')).toBeNull();
    });

    it('returns null for a file', () => {
      expect(listDir('/home/zis3c/about.txt')).toBeNull();
    });
  });

  describe('listDirLong', () => {
    it('returns long format listing for home', () => {
      const result = listDirLong('/home/zis3c');
      expect(result).not.toBeNull();
      expect(result!).toContain('total');
      expect(result!).toContain('drwxr-xr-x');
    });

    it('returns null for non-existent directory', () => {
      expect(listDirLong('/home/zis3c/fake')).toBeNull();
    });
  });

  /* ---- readFile / writeFile ---- */
  describe('readFile', () => {
    it('reads about.txt content', () => {
      const content = readFile('/home/zis3c/about.txt');
      expect(content).not.toBeNull();
      expect(content!).toContain('Radzi Zamri');
    });

    it('returns null for directories', () => {
      expect(readFile('/home/zis3c/Projects')).toBeNull();
    });

    it('returns null for non-existent files', () => {
      expect(readFile('/home/zis3c/nope.txt')).toBeNull();
    });
  });

  describe('writeFile', () => {
    it('writes and reads back content', () => {
      const original = readFile('/home/zis3c/about.txt')!;
      const wrote = writeFile('/home/zis3c/about.txt', 'new content');
      expect(wrote).toBe(true);
      expect(readFile('/home/zis3c/about.txt')).toBe('new content');
      // Restore original content so other tests aren't affected
      writeFile('/home/zis3c/about.txt', original);
    });

    it('returns false for directories', () => {
      expect(writeFile('/home/zis3c/Projects', 'x')).toBe(false);
    });

    it('returns false for non-existent paths', () => {
      expect(writeFile('/home/zis3c/fake/f.txt', 'x')).toBe(false);
    });
  });

  /* ---- createDir ---- */
  describe('createDir', () => {
    it('creates a new empty directory', () => {
      expect(createDir('/home/zis3c/testdir')).toBe(true);
      const node = findNode('/home/zis3c/testdir');
      expect(node).not.toBeNull();
      expect(node!.type).toBe('dir');
      // Cleanup
      deleteNode('/home/zis3c/testdir');
    });

    it('returns false for existing directory', () => {
      createDir('/home/zis3c/duptest');
      expect(createDir('/home/zis3c/duptest')).toBe(false);
      deleteNode('/home/zis3c/duptest');
    });
  });

  /* ---- renameNode ---- */
  describe('renameNode', () => {
    it('renames a file', () => {
      const original = readFile('/home/zis3c/about.txt')!;
      writeFile('/home/zis3c/about.txt', 'temp');
      expect(renameNode('/home/zis3c/about.txt', 'renamed.txt')).toBe(true);
      expect(findNode('/home/zis3c/renamed.txt')).not.toBeNull();
      // Restore name and content
      renameNode('/home/zis3c/renamed.txt', 'about.txt');
      writeFile('/home/zis3c/about.txt', original);
    });

    it('returns false for slashes in name', () => {
      expect(renameNode('/home/zis3c/about.txt', 'bad/name')).toBe(false);
    });
  });

  /* ---- deleteNode ---- */
  describe('deleteNode', () => {
    it('deletes an empty directory', () => {
      createDir('/home/zis3c/toDelete');
      expect(deleteNode('/home/zis3c/toDelete')).toBe(true);
      expect(findNode('/home/zis3c/toDelete')).toBeNull();
    });

    it('refuses to delete non-empty directory', () => {
      expect(deleteNode('/home/zis3c/Projects')).toBe(false);
    });

    it('returns false for non-existent paths', () => {
      expect(deleteNode('/home/zis3c/ghost')).toBe(false);
    });
  });

  /* ---- isDir ---- */
  describe('isDir', () => {
    it('returns true for directories', () => {
      expect(isDir('/home/zis3c/Projects')).toBe(true);
    });

    it('returns false for files', () => {
      expect(isDir('/home/zis3c/about.txt')).toBe(false);
    });

    it('returns false for non-existent paths', () => {
      expect(isDir('/home/zis3c/nope')).toBe(false);
    });
  });

  /* ---- toTildePath ---- */
  describe('toTildePath', () => {
    it('converts /home/zis3c to ~', () => {
      expect(toTildePath('/home/zis3c')).toBe('~');
    });

    it('converts /home/zis3c/Projects to ~/Projects', () => {
      expect(toTildePath('/home/zis3c/Projects')).toBe('~/Projects');
    });

    it('passes through non-home paths', () => {
      expect(toTildePath('/etc/hostname')).toBe('/etc/hostname');
    });
  });
});
