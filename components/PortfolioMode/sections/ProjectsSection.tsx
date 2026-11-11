import React, { useEffect, useRef } from 'react';
import {
  FaCodeBranch,
  FaFolder,
  FaGithub,
  FaLock,
  FaStar,
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import * as Styled from '../PortfolioMode.styles';
import { featuredProjects, PROJECT_FILTERS } from '../PortfolioMode.data';
import type {
  FeaturedProject,
  GithubRepoStat,
  ProjectFilter,
} from '../PortfolioMode.data';

interface Props {
  filteredProjects: FeaturedProject[];
  projectFilter: ProjectFilter;
  setProjectFilter: (filter: ProjectFilter) => void;
  repoStats: Record<string, GithubRepoStat>;
  focusedProjectIndex: number;
  setFocusedProjectIndex: (index: number) => void;
}

const ProjectsSection = ({
  filteredProjects,
  projectFilter,
  setProjectFilter,
  repoStats,
  focusedProjectIndex,
  setFocusedProjectIndex,
}: Props): JSX.Element => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const card = document.getElementById(`project-card-${focusedProjectIndex}`);
    if (card) {
      card.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [focusedProjectIndex]);

  return (
    <Styled.DirectoryFrame id="simple-projects">
      <Styled.DirectoryHeaderBar>
        <Styled.SectionHeader style={{ marginBottom: 0 }}>
          <Styled.SectionTitle>Projects</Styled.SectionTitle>
          <Styled.SectionSubtitle>
            A complete list of my 23 projects across security, web apps,
            hardware, and bots. Star counts update live from GitHub.
          </Styled.SectionSubtitle>
        </Styled.SectionHeader>
        <Styled.DirectoryCountBadge>
          {filteredProjects.length} of {featuredProjects.length} projects
        </Styled.DirectoryCountBadge>
      </Styled.DirectoryHeaderBar>

      <Styled.FilterRow role="tablist" aria-label="Filter projects">
        {PROJECT_FILTERS.map((filter) => (
          <Styled.FilterChip
            key={filter}
            type="button"
            isActive={projectFilter === filter}
            onClick={() => setProjectFilter(filter)}
          >
            {filter}
          </Styled.FilterChip>
        ))}
      </Styled.FilterRow>

      <Styled.ProjectsSection>
        {filteredProjects.length === 0 ? (
          <Styled.EmptyStateBox>
            <p>No projects match the selected category.</p>
            <button type="button" onClick={() => setProjectFilter('All')}>
              Show All Projects
            </button>
          </Styled.EmptyStateBox>
        ) : (
          filteredProjects.map((project, index) => {
            const repoSlug = project.link.split('/').pop()?.toLowerCase() || '';
            const liveStat = repoStats[repoSlug];

            return (
              <Styled.ProjectCard
                key={project.name}
                id={`project-card-${index}`}
                isFocused={index === focusedProjectIndex}
                onClick={() => setFocusedProjectIndex(index)}
              >
                <Styled.ProjectHeader>
                  <Styled.ProjectTopBar>
                    <Styled.ProjectIdentity>
                      <Styled.ProjectAvatar iconColor={project.iconColor}>
                        {project.icon}
                      </Styled.ProjectAvatar>
                      <Styled.ProjectMetaInfo>
                        <Styled.ProjectName title={project.name}>
                          {project.name}
                        </Styled.ProjectName>
                        <Styled.ProjectMetaRow>
                          <span className="repo-tag">
                            {project.isPrivate ? <FaLock /> : <FaFolder />}{' '}
                            {project.year} · {project.repoType}
                          </span>
                          {liveStat && liveStat.stars > 0 && (
                            <span
                              className="repo-tag"
                              title="Live stars from GitHub API"
                            >
                              <FaStar style={{ color: '#EAB308' }} />{' '}
                              {liveStat.stars}
                            </span>
                          )}
                          {liveStat && liveStat.forks > 0 && (
                            <span
                              className="repo-tag"
                              title="Live forks from GitHub API"
                            >
                              <FaCodeBranch /> {liveStat.forks}
                            </span>
                          )}
                        </Styled.ProjectMetaRow>
                      </Styled.ProjectMetaInfo>
                    </Styled.ProjectIdentity>

                    <Styled.ProjectQuickGithub
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`GitHub repo for ${project.name}`}
                      title="View on GitHub"
                    >
                      <FaGithub />
                    </Styled.ProjectQuickGithub>
                  </Styled.ProjectTopBar>

                  <Styled.ProjectSummary>
                    {project.summary}
                  </Styled.ProjectSummary>

                  <Styled.ProjectStackWrapper>
                    {project.stack.map((tech) => (
                      <Styled.TechBadge key={tech.name} iconColor={tech.color}>
                        <span className="tech-icon">{tech.icon}</span>
                        <span className="tech-name">{tech.name}</span>
                      </Styled.TechBadge>
                    ))}
                  </Styled.ProjectStackWrapper>
                </Styled.ProjectHeader>

                <Styled.ProjectActionRow>
                  <Styled.ProjectButtonGroup>
                    <Styled.ProjectOpenLink
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> View Code
                    </Styled.ProjectOpenLink>
                    {project.demoLink && (
                      <Styled.ProjectDemoLink
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FiExternalLink /> {project.demoLabel || 'Live Demo'}
                      </Styled.ProjectDemoLink>
                    )}
                  </Styled.ProjectButtonGroup>
                </Styled.ProjectActionRow>
              </Styled.ProjectCard>
            );
          })
        )}
      </Styled.ProjectsSection>
    </Styled.DirectoryFrame>
  );
};

export default ProjectsSection;
