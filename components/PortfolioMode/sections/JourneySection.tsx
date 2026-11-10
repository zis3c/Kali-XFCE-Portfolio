import React, { useState } from 'react';
import { FaExternalLinkAlt, FaFlag, FaUsers } from 'react-icons/fa';
import * as Styled from '../PortfolioMode.styles';
import { ctfCompetitions } from '../PortfolioMode.data';
import type { CtfCompetition } from '../PortfolioMode.data';

type CtfFilter = 'All' | 'National' | 'International' | 'Team' | 'Solo';

const JourneySection = (): JSX.Element => {
  const [filter, setFilter] = useState<CtfFilter>('All');

  const filteredCompetitions = ctfCompetitions.filter((c: CtfCompetition) => {
    if (filter === 'National') return c.level === 'National';
    if (filter === 'International') return c.level === 'International';
    if (filter === 'Team') return c.type === 'Team (Dot Zero)';
    if (filter === 'Solo') return c.type === 'Individual';
    return true;
  });

  return (
    <Styled.StorySection id="simple-journey">
      <Styled.SectionHeader>
        <Styled.SectionTitle>Experience &amp; Competitions</Styled.SectionTitle>
        <Styled.SectionSubtitle>
          Milestones from university studies, technical training, and 25 Capture
          The Flag (CTF) competitions played in Malaysia and globally on
          CTFtime.
        </Styled.SectionSubtitle>
      </Styled.SectionHeader>

      <Styled.TimelineWrap>
        <Styled.TimelineItem>
          <div className="time-period">
            <span>2026 · Present</span>
            <span className="time-sub">Final Year &amp; Research</span>
          </div>
          <div className="time-content">
            <h3 className="time-title">
              Cloud Security &amp; Hardware Firmware Projects
            </h3>
            <p className="time-desc">
              Developing CloudSentinel, a real-time SSH honeypot and threat
              monitoring dashboard, alongside custom ESP32-S3 hardware firmware
              for RedLilyGO.
            </p>
          </div>
        </Styled.TimelineItem>

        <Styled.TimelineItem>
          <div className="time-period">
            <span>2025 - 2026</span>
            <span className="time-sub">Dot Zero CTF Team</span>
          </div>
          <div className="time-content">
            <h3 className="time-title">
              Team Secretary &amp; Reverse Engineering Trainer
            </h3>
            <p className="time-desc">
              Organizing student training sessions, teaching hands-on reverse
              engineering workshops, and competing with Dot Zero in national and
              international CTF competitions.
            </p>
          </div>
        </Styled.TimelineItem>

        <Styled.TimelineItem>
          <div className="time-period">
            <span>2024 - 2026</span>
            <span className="time-sub">Campus &amp; Open Source</span>
          </div>
          <div className="time-content">
            <h3 className="time-title">
              Building Web Platforms &amp; Student Tools
            </h3>
            <p className="time-desc">
              Created and launched web apps and Telegram bots for university
              students, including the STEM-USAS portal, Class Timetable builder,
              Assignment Notifier, and JanjiCare clinic system.
            </p>
          </div>
        </Styled.TimelineItem>

        <Styled.TimelineItem>
          <div className="time-period">
            <span>2021 - 2024</span>
            <span className="time-sub">Foundations</span>
          </div>
          <div className="time-content">
            <h3 className="time-title">
              Linux, Networking &amp; Software Development
            </h3>
            <p className="time-desc">
              Built a strong foundation in Linux systems, networking, databases,
              and web programming through coursework and personal projects.
            </p>
          </div>
        </Styled.TimelineItem>
      </Styled.TimelineWrap>

      {/* CTF Competitions Records & Team Dot Zero */}
      <Styled.CtfShowcaseWrap>
        <Styled.CtfTeamBanner>
          <div>
            <div className="team-title">
              <FaUsers />
              <span>Team Dot Zero</span>
            </div>
            <div className="team-roster">
              Radzi Zamri · Mohamad Idham bin Hussein · Ahmad Khairuddin bin
              Mohamad Azmin
            </div>
          </div>
          <div className="team-stats">
            <span className="stat-pill">25 Competitions Total</span>
            <span className="stat-pill">5 National (MY)</span>
            <span className="stat-pill">20 International (CTFtime)</span>
          </div>
        </Styled.CtfTeamBanner>

        <Styled.CtfTabsRow>
          <div className="tabs-group" role="tablist" aria-label="Filter CTFs">
            <Styled.CtfTabButton
              type="button"
              isActive={filter === 'All'}
              onClick={() => setFilter('All')}
            >
              All (25)
            </Styled.CtfTabButton>
            <Styled.CtfTabButton
              type="button"
              isActive={filter === 'National'}
              onClick={() => setFilter('National')}
            >
              National MY (5)
            </Styled.CtfTabButton>
            <Styled.CtfTabButton
              type="button"
              isActive={filter === 'International'}
              onClick={() => setFilter('International')}
            >
              CTFtime Global (20)
            </Styled.CtfTabButton>
            <Styled.CtfTabButton
              type="button"
              isActive={filter === 'Team'}
              onClick={() => setFilter('Team')}
            >
              Dot Zero (23)
            </Styled.CtfTabButton>
            <Styled.CtfTabButton
              type="button"
              isActive={filter === 'Solo'}
              onClick={() => setFilter('Solo')}
            >
              Solo (2)
            </Styled.CtfTabButton>
          </div>

          <a
            href="https://ctftime.org/team/421634"
            target="_blank"
            rel="noopener noreferrer"
            className="ctftime-link"
          >
            <FaFlag />
            <span>CTFtime Profile</span>
            <FaExternalLinkAlt size={11} />
          </a>
        </Styled.CtfTabsRow>

        <Styled.CtfGrid>
          {filteredCompetitions.map((comp) => {
            const isTopTen = comp.position <= 10;
            return (
              <Styled.CtfCard key={comp.id} isTopTen={isTopTen}>
                <div className="ctf-left">
                  <div className="ctf-info">
                    <span className="ctf-name" title={comp.name}>
                      {comp.name}
                    </span>
                    <span className="ctf-meta">
                      {comp.year} · {comp.level} · {comp.type}
                    </span>
                  </div>
                </div>
                <div className="ctf-rank" title={`Ranked #${comp.position}`}>
                  #{comp.position}
                </div>
              </Styled.CtfCard>
            );
          })}
        </Styled.CtfGrid>
      </Styled.CtfShowcaseWrap>

      <Styled.RecognitionGrid>
        <Styled.RecognitionCard>
          <div className="rec-top">
            <span>National Top 5 · 2026</span>
            <span className="rec-badge">4th Place</span>
          </div>
          <h4>TAMiNG iCTFF8 UiTM</h4>
          <p>
            Finished 4th in Malaysia with team Dot Zero against national
            university teams.
          </p>
        </Styled.RecognitionCard>

        <Styled.RecognitionCard>
          <div className="rec-top">
            <span>CTFtime Top 40 · 2026</span>
            <span className="rec-badge">39th Global</span>
          </div>
          <h4>BearcatCTF 2026</h4>
          <p>
            Finished 39th internationally with Dot Zero in BearcatCTF Setting
            Sail.
          </p>
        </Styled.RecognitionCard>

        <Styled.RecognitionCard>
          <div className="rec-top">
            <span>National Top 5 · 2025</span>
            <span className="rec-badge">5th Place</span>
          </div>
          <h4>NERACA 3.0 CTF</h4>
          <p>
            Finished 5th in Malaysia with team Dot Zero focusing on reverse
            engineering and binary challenges.
          </p>
        </Styled.RecognitionCard>
      </Styled.RecognitionGrid>
    </Styled.StorySection>
  );
};

export default JourneySection;
