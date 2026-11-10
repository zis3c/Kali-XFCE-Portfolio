import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as Styled from './PortfolioMode.styles';
import { featuredProjects } from './PortfolioMode.data';
import type {
  GithubRepoStat,
  ProjectFilter,
  SimpleTheme,
} from './PortfolioMode.data';
import PortfolioNav from './PortfolioNav';
import PortfolioBootLoader from './PortfolioBootLoader';
import CommandPalette from './CommandPalette';
import AsciiWaveBg from './AsciiWaveBg';
import HeroSection from './sections/HeroSection';
import CraftSection from './sections/CraftSection';
import ProjectsSection from './sections/ProjectsSection';
import JourneySection from './sections/JourneySection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';

interface Props {
  onBackToChooser: () => void;
}

const PortfolioMode = ({ onBackToChooser }: Props): JSX.Element => {
  const [projectFilter, setProjectFilter] = useState<ProjectFilter>('All');
  const [simpleTheme, setSimpleTheme] = useState<SimpleTheme>('terminal');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [focusedProjectIndex, setFocusedProjectIndex] = useState(0);
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [repoStats, setRepoStats] = useState<Record<string, GithubRepoStat>>(
    {}
  );

  const filteredProjects = featuredProjects.filter((project) => {
    if (projectFilter === 'All') return true;
    return project.tags.includes(projectFilter);
  });

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const paletteActions = useMemo(
    () => [
      { label: 'Go to About', run: () => jumpTo('simple-about') },
      { label: 'Go to Projects', run: () => jumpTo('simple-projects') },
      { label: 'Go to Contact', run: () => jumpTo('simple-contact') },
      {
        label: 'Open GitHub',
        run: () =>
          window.open(
            'https://github.com/zis3c',
            '_blank',
            'noopener,noreferrer'
          ),
      },
      {
        label: 'Toggle Theme',
        run: () =>
          setSimpleTheme((prev) =>
            prev === 'terminal' ? 'paper' : 'terminal'
          ),
      },
    ],
    [jumpTo]
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsBootLoading(false);
    }, 450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setFocusedProjectIndex(0);
  }, [projectFilter]);

  /* Fetch live stars & forks directly from GitHub public REST API */
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.fetch !== 'function') {
      return;
    }
    let isMounted = true;
    window
      .fetch('https://api.github.com/users/zis3c/repos?per_page=100')
      .then((res) => (res && res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !Array.isArray(data)) return;
        const nextStats: Record<string, GithubRepoStat> = {};
        data.forEach((repo: Record<string, unknown>) => {
          if (typeof repo.name === 'string') {
            nextStats[repo.name.toLowerCase()] = {
              stars:
                typeof repo.stargazers_count === 'number'
                  ? repo.stargazers_count
                  : 0,
              forks:
                typeof repo.forks_count === 'number' ? repo.forks_count : 0,
            };
          }
        });
        setRepoStats(nextStats);
      })
      .catch(() => {
        /* Fallback silently if GitHub API is rate-limited or offline */
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const prevHtmlScrollBehavior =
      document.documentElement.style.scrollBehavior;
    const prevBodyScrollBehavior = document.body.style.scrollBehavior;
    const prevHtmlHeight = document.documentElement.style.height;
    const prevBodyHeight = document.body.style.height;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;

    document.documentElement.style.scrollBehavior = 'smooth';
    document.body.style.scrollBehavior = 'smooth';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.scrollBehavior = prevHtmlScrollBehavior;
      document.body.style.scrollBehavior = prevBodyScrollBehavior;
      document.documentElement.style.height = prevHtmlHeight;
      document.body.style.height = prevBodyHeight;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape') {
        setIsPaletteOpen(false);
        return;
      }
      if (isPaletteOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setPaletteIndex((prev) => (prev + 1) % paletteActions.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setPaletteIndex(
            (prev) => (prev - 1 + paletteActions.length) % paletteActions.length
          );
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          paletteActions[paletteIndex].run();
          setIsPaletteOpen(false);
        }
        return;
      }
      if (e.key.toLowerCase() === 'j') {
        e.preventDefault();
        window.scrollBy({ top: 230, behavior: 'smooth' });
      }
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        window.scrollBy({ top: -230, behavior: 'smooth' });
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedProjectIndex(
          (prev) => (prev + 1) % Math.max(1, filteredProjects.length)
        );
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedProjectIndex(
          (prev) =>
            (prev - 1 + Math.max(1, filteredProjects.length)) %
            Math.max(1, filteredProjects.length)
        );
      }
      const targetTag = (e.target as HTMLElement | null)?.tagName;
      if (
        e.key === 'Enter' &&
        targetTag !== 'BUTTON' &&
        targetTag !== 'A' &&
        filteredProjects[focusedProjectIndex]
      ) {
        window.open(
          filteredProjects[focusedProjectIndex].link,
          '_blank',
          'noopener,noreferrer'
        );
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    isPaletteOpen,
    paletteIndex,
    filteredProjects,
    focusedProjectIndex,
    paletteActions,
  ]);

  return (
    <Styled.Wrapper themeMode={simpleTheme}>
      <AsciiWaveBg themeMode={simpleTheme} />
      <PortfolioBootLoader
        isOpen={isBootLoading}
        onDismiss={() => setIsBootLoading(false)}
      />

      <PortfolioNav
        simpleTheme={simpleTheme}
        onToggleTheme={() =>
          setSimpleTheme((prev) => (prev === 'terminal' ? 'paper' : 'terminal'))
        }
        onOpenPalette={() => setIsPaletteOpen(true)}
        onBackToChooser={onBackToChooser}
        jumpTo={jumpTo}
      />

      <Styled.Main>
        <HeroSection />
        <CraftSection />
        <ProjectsSection
          filteredProjects={filteredProjects}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
          repoStats={repoStats}
          focusedProjectIndex={focusedProjectIndex}
          setFocusedProjectIndex={setFocusedProjectIndex}
        />
        <JourneySection />
        <SkillsSection />
        <ContactSection />
      </Styled.Main>

      <CommandPalette
        isOpen={isPaletteOpen}
        actions={paletteActions}
        paletteIndex={paletteIndex}
        onClose={() => setIsPaletteOpen(false)}
      />
    </Styled.Wrapper>
  );
};

export default PortfolioMode;
