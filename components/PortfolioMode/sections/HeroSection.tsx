import React from 'react';
import {
  FaFlag,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import * as Styled from '../PortfolioMode.styles';
import GlitchText from '../GlitchText';

const HeroSection = (): JSX.Element => (
  <Styled.HeroWorkbench id="simple-about">
    <Styled.HeroSection>
      <Styled.HeroTitle>
        <GlitchText
          words={[
            'Hi, I am Radzi (zis3c).',
            'Cybersecurity Researcher.',
            'Full-Stack Web Developer.',
            'Software & Bot Builder.',
          ]}
        />
      </Styled.HeroTitle>

      <Styled.HeroRoleSub>
        Computer Science Student · Cybersecurity Researcher
      </Styled.HeroRoleSub>

      <Styled.HeroText>
        I am a Computer Science student based in Malaysia who enjoys building
        practical software and exploring how systems work under the hood. My
        work ranges from cloud security tools and hardware firmware to
        full-stack web applications and Telegram bots that solve everyday
        problems for students.
      </Styled.HeroText>

      <Styled.HeroText>
        Outside of personal projects, I contribute to our university society,
        STEM USAS, helping build student portals and automation bots. I am also
        an active member of our CTF team, Dot Zero, where I help run hands-on
        reverse engineering workshops and compete alongside teammates in
        cybersecurity competitions.
      </Styled.HeroText>

      <Styled.SocialGrid>
        <Styled.SocialButton
          href="https://github.com/zis3c"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </Styled.SocialButton>
        <Styled.SocialButton
          href="https://linkedin.com/in/radzizamri"
          target="_blank"
          rel="noopener noreferrer"
          iconColor="#0A66C2"
        >
          <FaLinkedin /> LinkedIn
        </Styled.SocialButton>
        <Styled.SocialButton
          href="https://ctftime.org/team/421634"
          target="_blank"
          rel="noopener noreferrer"
          iconColor="#EF4444"
        >
          <FaFlag /> Dot Zero CTF
        </Styled.SocialButton>
        <Styled.SocialButton
          href="https://www.youtube.com/@zis3c"
          target="_blank"
          rel="noopener noreferrer"
          iconColor="#FF0000"
        >
          <FaYoutube /> YouTube
        </Styled.SocialButton>
        <Styled.SocialButton
          href="https://www.instagram.com/radz.z_/"
          target="_blank"
          rel="noopener noreferrer"
          iconColor="#E4405F"
        >
          <FaInstagram /> Instagram
        </Styled.SocialButton>
      </Styled.SocialGrid>
    </Styled.HeroSection>

    <Styled.QuickStatsGrid>
      <Styled.QuickStatCard>
        <span className="stat-label">Primary Focus</span>
        <span className="stat-value">Cybersecurity</span>
      </Styled.QuickStatCard>
      <Styled.QuickStatCard>
        <span className="stat-label">University Team</span>
        <span className="stat-value">Dot Zero CTF</span>
      </Styled.QuickStatCard>
      <Styled.QuickStatCard>
        <span className="stat-label">CTF Record</span>
        <span className="stat-value">25 Competitions Played</span>
      </Styled.QuickStatCard>
      <Styled.QuickStatCard>
        <span className="stat-label">Based In</span>
        <span className="stat-value">Malaysia (UTC+8)</span>
      </Styled.QuickStatCard>
    </Styled.QuickStatsGrid>
  </Styled.HeroWorkbench>
);

export default HeroSection;
