import React from 'react';
import * as Styled from '../PortfolioMode.styles';

const JourneySection = (): JSX.Element => (
  <Styled.StorySection id="simple-journey">
    <Styled.SectionHeader>
      <Styled.SectionTitle>Experience &amp; Journey</Styled.SectionTitle>
      <Styled.SectionSubtitle>
        Key milestones from my studies, university clubs, and security
        competitions.
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
            engineering workshops, and competing with our university team in
            international CTF events.
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

    <Styled.RecognitionGrid>
      <Styled.RecognitionCard>
        <div className="rec-top">
          <span>CTF Competition · 2026</span>
          <span className="rec-badge">21st / 316 Teams</span>
        </div>
        <h4>RE:UN10N CTF · Dot Zero</h4>
        <p>
          Placed 21st internationally with our university CTF team, focusing on
          reverse engineering challenges.
        </p>
      </Styled.RecognitionCard>

      <Styled.RecognitionCard>
        <div className="rec-top">
          <span>International CTFs · 2026</span>
          <span className="rec-badge">Top 15%</span>
        </div>
        <h4>ApoorvCTF (#88) &amp; 0xFun CTF (#133)</h4>
        <p>
          Finished 88th out of 620 teams in ApoorvCTF and 133rd out of 975 teams
          in 0xFun CTF.
        </p>
      </Styled.RecognitionCard>

      <Styled.RecognitionCard>
        <div className="rec-top">
          <span>Certificates</span>
          <span className="rec-badge">Completed</span>
        </div>
        <h4>Google Cybersecurity &amp; RE Bootcamp</h4>
        <p>
          Completed the Google Cybersecurity Certificate and hands-on Reverse
          Engineering training.
        </p>
      </Styled.RecognitionCard>
    </Styled.RecognitionGrid>
  </Styled.StorySection>
);

export default JourneySection;
