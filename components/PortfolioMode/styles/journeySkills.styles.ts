import styled from 'styled-components';

/* ------------------------------------------------------------------ */
/*  Section 4: Experience & Achievements                               */
/* ------------------------------------------------------------------ */

export const TimelineWrap = styled.div`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const TimelineItem = styled.div`
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 24px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-strong);
  align-items: start;

  &:last-child {
    border-bottom: none;
  }

  .time-period {
    font-size: 13.5px;
    font-weight: 600;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .time-sub {
    font-size: 12.5px;
    font-weight: 500;
    color: var(--muted);
  }

  .time-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .time-title {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
    color: var(--text);
  }

  .time-desc {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.7;
    color: var(--muted);
    width: 100%;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 8px;
    padding: 18px 16px;
  }
`;

export const RecognitionGrid = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const RecognitionCard = styled.div`
  padding: 18px 20px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 8px;

  .rec-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
  }

  .rec-badge {
    padding: 3px 9px;
    border-radius: 6px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    color: var(--text);
    font-weight: 600;
  }

  h4 {
    margin: 4px 0 0;
    font-size: 16px;
    font-weight: 700;
    color: var(--text);
  }

  p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.6;
    color: var(--muted);
  }
`;

export const CtfShowcaseWrap = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const CtfTeamBanner = styled.div`
  padding: 18px 22px;
  background: var(--panel);
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  box-shadow: var(--card-shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;

  .team-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16.5px;
    font-weight: 700;
    color: var(--text);
  }

  .team-roster {
    font-size: 12.5px;
    color: var(--muted);
    margin-top: 3px;
  }

  .team-stats {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .stat-pill {
    padding: 5px 12px;
    border-radius: 8px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    font-size: 12px;
    font-weight: 600;
    color: var(--text);
  }
`;

export const CtfTabsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;

  .tabs-group {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .ctftime-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
    padding: 6px 12px;
    border-radius: 8px;
    background: var(--well);
    border: 1px solid var(--border-strong);
    transition: all 0.15s ease;

    &:hover {
      border-color: var(--border-hover);
      background: var(--well-hover);
    }
  }
`;

export const CtfTabButton = styled.button<{ isActive: boolean }>`
  min-height: 36px;
  padding: 6px 14px;
  border-radius: 8px;
  font-family: inherit;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-strong)'};
  background: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-bg)' : 'var(--panel)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--btn-primary-text)' : 'var(--muted)'};

  &:hover {
    color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-text)' : 'var(--text)'};
    border-color: ${({ isActive }) =>
      isActive ? 'var(--btn-primary-bg)' : 'var(--border-hover)'};
  }
`;

export const CtfGridWrap = styled.div`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const CtfGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 14px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 12px;
    gap: 8px;
  }
`;

export const CtfGridFooter = styled.div`
  padding: 10px 16px;
  background: var(--well);
  border-top: 1px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 12px;
  color: var(--muted);

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text);
    font-weight: 600;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CtfCard = styled.div<{ isTopTen?: boolean }>`
  padding: 12px 14px;
  border-radius: 10px;
  background: var(--panel);
  border: 1px solid
    ${({ isTopTen }) =>
      isTopTen ? 'var(--border-hover)' : 'var(--border-strong)'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: var(--card-shadow);

  .ctf-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .ctf-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .ctf-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ctf-meta {
    font-size: 11.5px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .ctf-rank {
    flex-shrink: 0;
    padding: 3px 9px;
    border-radius: 6px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    background: ${({ isTopTen }) =>
      isTopTen ? 'var(--well-hover)' : 'var(--well)'};
    color: var(--text);
    border: 1px solid var(--border-strong);
  }
`;

/* ------------------------------------------------------------------ */
/*  Section 5: Technical Skills                                        */
/* ------------------------------------------------------------------ */

export const ArsenalSection = styled.section`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 40px 0;
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

  @media (max-width: 768px) {
    min-height: auto;
    padding: 48px 0 32px;
  }
`;

export const ArsenalRack = styled.div`
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--panel);
  box-shadow: var(--card-shadow);
  overflow: hidden;
`;

export const ArsenalRow = styled.div`
  display: grid;
  grid-template-columns: 310px 1fr;
  border-bottom: 1px solid var(--border-strong);

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const ArsenalRowMeta = styled.div`
  padding: 18px 22px;
  background: var(--well);
  border-right: 1px solid var(--border-strong);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;

  .rack-title {
    font-size: 14.5px;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  .rack-desc {
    font-size: 13px;
    color: var(--muted);
    line-height: 1.45;
  }

  @media (max-width: 820px) {
    border-right: none;
    border-bottom: 1px solid var(--border-strong);
    padding: 14px 16px;

    .rack-title {
      white-space: normal;
    }
  }
`;

export const ArsenalBadgeList = styled.div`
  padding: 18px 22px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;

  @media (max-width: 640px) {
    padding: 14px 16px;
    gap: 8px;
  }
`;

export const ArsenalBadge = styled.div<{ iconColor?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 13px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  background: var(--well);
  border: 1px solid var(--border-strong);
  color: var(--text);

  .badge-icon {
    display: inline-flex;
    align-items: center;
    font-size: 15px;
    color: ${({ iconColor }) => iconColor || 'var(--text)'};
  }
`;
