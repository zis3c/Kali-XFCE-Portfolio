import React from 'react';
import { FaDesktop, FaShieldAlt } from 'react-icons/fa';
import { FiTerminal } from 'react-icons/fi';
import * as Styled from '../PortfolioMode.styles';

const CraftSection = (): JSX.Element => (
  <Styled.StorySection id="simple-craft">
    <Styled.SectionHeader>
      <Styled.SectionTitle>What I Do</Styled.SectionTitle>
      <Styled.SectionSubtitle>
        A simple look at the three areas I spend most of my time building and
        learning in.
      </Styled.SectionSubtitle>
    </Styled.SectionHeader>

    <Styled.PillarGrid>
      <Styled.PillarCard>
        <div className="pillar-icon">
          <FaShieldAlt />
        </div>
        <h3>Security &amp; Threat Monitoring</h3>
        <p>
          I build security monitoring systems and honeypots to study how
          automated attacks happen on the internet and design faster ways to
          block them automatically.
        </p>
        <div className="pillar-tags">
          <span className="pillar-tag">Cloud Security</span>
          <span className="pillar-tag">Network Defense</span>
          <span className="pillar-tag">Automation</span>
        </div>
      </Styled.PillarCard>

      <Styled.PillarCard>
        <div className="pillar-icon">
          <FiTerminal />
        </div>
        <h3>Reverse Engineering &amp; CTFs</h3>
        <p>
          I analyze compiled programs and mobile apps to understand how they
          work internally, and lead introductory workshops for students in our
          university CTF team.
        </p>
        <div className="pillar-tags">
          <span className="pillar-tag">Binary Analysis</span>
          <span className="pillar-tag">Debugging</span>
          <span className="pillar-tag">CTF Workshops</span>
        </div>
      </Styled.PillarCard>

      <Styled.PillarCard>
        <div className="pillar-icon">
          <FaDesktop />
        </div>
        <h3>Web Apps &amp; Automation Bots</h3>
        <p>
          I create modern web platforms, Telegram bots, and hardware tools that
          make daily tasks easier for university students, clinics, and
          developers.
        </p>
        <div className="pillar-tags">
          <span className="pillar-tag">Next.js &amp; React</span>
          <span className="pillar-tag">Laravel &amp; Python</span>
          <span className="pillar-tag">Telegram Bots</span>
        </div>
      </Styled.PillarCard>
    </Styled.PillarGrid>
  </Styled.StorySection>
);

export default CraftSection;
