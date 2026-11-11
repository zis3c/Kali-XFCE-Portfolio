import styled from 'styled-components';

/* ------------------------------------------------------------------ */
/*  Section 3: Projects Directory (Minimalist & Clean)                 */
/* ------------------------------------------------------------------ */

export const DirectoryFrame = styled.section`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 48px 0;
  scroll-snap-align: start;
  scroll-margin-top: 64px;

  /* Smooth scroll reveal */
  opacity: 1;
  animation: sectionAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-timeline: view();
  animation-range: entry 10% cover 30%;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 1;
    transform: none;
  }

  @media (max-width: 900px) {
    padding: 40px 0;
  }
`;

export const DirectoryHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

export const DirectoryCountBadge = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
  background: var(--panel);
  border: 1px solid var(--border-strong);
  padding: 6px 14px;
  border-radius: 8px;
`;

export const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const FilterChip = styled.button<{ isActive: boolean }>`
  min-height: 42px;
  min-width: 44px;
  padding: 8px 18px;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-strong)'};
  background: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-bg)' : 'var(--panel)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-text)' : 'var(--muted)'};
  border-radius: 8px;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-hover)'};
    color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-text)' : 'var(--text)'};
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1 1 calc(33.333% - 6px);
    min-height: 38px;
    padding: 7px 8px;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
  }
`;

export const ProjectsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const ProjectCard = styled.article<{
  accentColor?: string;
  isFocused: boolean;
  isFlagship?: boolean;
}>`
  border: 1px solid
    ${({ isFocused }) =>
      isFocused ? 'var(--focus-ring)' : 'var(--border-strong)'};
  border-radius: 12px;
  background: var(--panel);
  box-shadow: ${({ isFocused }) =>
    isFocused ? '0 8px 30px rgba(0, 0, 0, 0.45)' : 'var(--card-shadow)'};
  padding: 28px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  scroll-margin-top: 100px;
  scroll-margin-bottom: 100px;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  ${({ isFocused }) =>
    isFocused &&
    `
    transform: translateY(-2px);
  `}

  &:hover {
    transform: translateY(-2px);
    border-color: var(--border-hover);
  }

  @media (max-width: 640px) {
    padding: 18px 16px;
    gap: 14px;
  }
`;

export const ProjectHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;

  @media (max-width: 640px) {
    gap: 12px;
  }
`;

export const ProjectTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  min-width: 0;
`;

export const ProjectIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
  flex: 1;

  @media (max-width: 640px) {
    gap: 10px;
    align-items: flex-start;
  }
`;

export const ProjectAvatar = styled.div<{ iconColor?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ iconColor }) => iconColor || 'var(--text)'};
  background: ${({ iconColor }) =>
    iconColor ? `${iconColor}14` : 'var(--well)'};
  border: 1px solid
    ${({ iconColor }) =>
      iconColor ? `${iconColor}33` : 'var(--border-strong)'};
  flex-shrink: 0;
  transition: transform 0.2s ease, border-color 0.2s ease;

  @media (max-width: 640px) {
    width: 38px;
    height: 38px;
    font-size: 17px;
  }
`;

export const ProjectMetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  flex: 1;
`;

export const ProjectName = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

export const ProjectMetaRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 13px;
  color: var(--muted);
  min-width: 0;

  .repo-tag {
    display: inline-flex;
    align-items: flex-start;
    gap: 5px;
    line-height: 1.35;
    min-width: 0;
    max-width: 100%;

    svg {
      flex-shrink: 0;
      margin-top: 2px;
    }
  }

  @media (max-width: 640px) {
    gap: 6px 8px;
    font-size: 12px;
  }
`;

export const ProjectQuickGithub = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);
  font-size: 17px;
  text-decoration: none;
  flex-shrink: 0;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--border-hover);
    background: var(--well-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const ProjectSummary = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 14.5px;
  overflow-wrap: break-word;

  @media (max-width: 640px) {
    font-size: 13.5px;
    line-height: 1.6;
  }
`;

export const ProjectStackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  @media (max-width: 640px) {
    gap: 6px;
  }
`;

export const TechBadge = styled.span<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 6px;
  font-size: 12.5px;
  font-weight: 500;
  border: 1px solid var(--border-strong);
  background: var(--well);
  color: var(--text);

  .tech-icon {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }

  .tech-name {
    font-size: 12.5px;
  }

  @media (max-width: 640px) {
    padding: 4px 9px;
    gap: 5px;

    .tech-icon {
      font-size: 13px;
    }

    .tech-name {
      font-size: 11.5px;
    }
  }
`;

export const ProjectActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--border-subtle);
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding-top: 12px;
  }
`;

export const ProjectButtonGroup = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;

  @media (max-width: 640px) {
    gap: 8px;
  }
`;

export const ProjectOpenLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--btn-primary-bg);
  border: 1px solid var(--btn-primary-bg);
  color: var(--btn-primary-text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  transition: background 0.15s ease;

  &:hover {
    background: var(--btn-primary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 38px;
    padding: 7px 12px;
    font-size: 12.5px;
  }
`;

export const ContactLink = styled.a<{ $brandColor: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 8px 18px;
  border-radius: 8px;
  background: var(--well);
  border: 1px solid var(--border-strong);
  color: var(--text);
  text-decoration: none;
  font-size: 13.5px;
  font-weight: 600;
  user-select: none;
  -webkit-user-select: none;
  transition: all 0.2s ease;

  svg {
    color: ${({ $brandColor }) =>
      $brandColor === '#e2e8f0' ? 'var(--text)' : $brandColor};
    font-size: 17px;
    transition: transform 0.2s ease, color 0.2s ease;
  }

  &:hover {
    background: ${({ $brandColor }) =>
      $brandColor === '#e2e8f0' ? 'var(--well-hover)' : `${$brandColor}18`};
    border-color: ${({ $brandColor }) =>
      $brandColor === '#e2e8f0' ? 'var(--border-hover)' : `${$brandColor}60`};
    color: var(--text);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px
      ${({ $brandColor }) =>
        $brandColor === '#e2e8f0' ? 'rgba(0, 0, 0, 0.25)' : `${$brandColor}35`};

    svg {
      color: ${({ $brandColor }) =>
        $brandColor === '#e2e8f0' ? 'var(--text)' : $brandColor};
      transform: scale(1.12);
    }
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ProjectDemoLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 42px;
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: var(--border-hover);
    background: var(--well-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 2px;
  }

  @media (max-width: 640px) {
    flex: 1 1 auto;
    min-width: 0;
    min-height: 38px;
    padding: 7px 12px;
    font-size: 12.5px;
  }
`;

export const EmptyStateBox = styled.div`
  grid-column: 1 / -1;
  padding: 40px 24px;
  background: var(--panel);
  border: 1px dashed var(--border-strong);
  border-radius: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }

  button {
    min-height: 42px;
    padding: 8px 16px;
    background: var(--btn-primary-bg);
    border: 1px solid var(--btn-primary-bg);
    color: var(--btn-primary-text);
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
  }
`;
