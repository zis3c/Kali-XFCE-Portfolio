import React from 'react';
import { FcLinux } from 'react-icons/fc';
import { FiCpu, FiTerminal } from 'react-icons/fi';
import {
  SiCplusplus,
  SiDigitalocean,
  SiDocker,
  SiDotnet,
  SiGithubactions,
  SiGnu,
  SiGnubash,
  SiJavascript,
  SiKalilinux,
  SiLaravel,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
  SiTelegram,
  SiTypescript,
  SiWebrtc,
  SiWireshark,
} from 'react-icons/si';
import { FaMicrochip, FaShieldAlt } from 'react-icons/fa';
import {
  BinaryNinjaIcon,
  FridaIcon,
  GhidraIcon,
  IdaProIcon,
  X64dbgIcon,
} from '../ReversingIcons';
import * as Styled from '../PortfolioMode.styles';

const SkillsSection = (): JSX.Element => (
  <Styled.ArsenalSection id="simple-skills">
    <Styled.SectionHeader>
      <Styled.SectionTitle>
        <FiCpu />
        <span>Skills &amp; Tools</span>
      </Styled.SectionTitle>
      <Styled.SectionSubtitle>
        The languages, frameworks, and security tools I use regularly.
      </Styled.SectionSubtitle>
    </Styled.SectionHeader>

    <Styled.ArsenalRack>
      <Styled.ArsenalRow>
        <Styled.ArsenalRowMeta>
          <span className="rack-title">
            <FiTerminal /> Security &amp; Reversing
          </span>
          <span className="rack-desc">
            Binary analysis, debugging, and packet inspection.
          </span>
        </Styled.ArsenalRowMeta>
        <Styled.ArsenalBadgeList>
          <Styled.ArsenalBadge iconColor="#E2231A">
            <span className="badge-icon">
              <GhidraIcon />
            </span>
            <span>Ghidra</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#38BDF8">
            <span className="badge-icon">
              <IdaProIcon />
            </span>
            <span>IDA Pro</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#E03E2D">
            <span className="badge-icon">
              <BinaryNinjaIcon />
            </span>
            <span>Binary Ninja</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#4CB4E8">
            <span className="badge-icon">
              <X64dbgIcon />
            </span>
            <span>x64dbg</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#A855F7">
            <span className="badge-icon">
              <SiGnu />
            </span>
            <span>GDB</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#F97316">
            <span className="badge-icon">
              <FridaIcon />
            </span>
            <span>Frida</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#1679A7">
            <span className="badge-icon">
              <SiWireshark />
            </span>
            <span>Wireshark</span>
          </Styled.ArsenalBadge>
        </Styled.ArsenalBadgeList>
      </Styled.ArsenalRow>

      <Styled.ArsenalRow>
        <Styled.ArsenalRowMeta>
          <span className="rack-title">
            <FaMicrochip /> Programming Languages
          </span>
          <span className="rack-desc">
            Languages for backend scripts, firmware, and web apps.
          </span>
        </Styled.ArsenalRowMeta>
        <Styled.ArsenalBadgeList>
          <Styled.ArsenalBadge iconColor="#3776AB">
            <span className="badge-icon">
              <SiPython />
            </span>
            <span>Python</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#3178C6">
            <span className="badge-icon">
              <SiTypescript />
            </span>
            <span>TypeScript</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#F7DF1E">
            <span className="badge-icon">
              <SiJavascript />
            </span>
            <span>JavaScript</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#00599C">
            <span className="badge-icon">
              <SiCplusplus />
            </span>
            <span>C / C++</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#777BB4">
            <span className="badge-icon">
              <SiPhp />
            </span>
            <span>PHP</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#512BD4">
            <span className="badge-icon">
              <SiDotnet />
            </span>
            <span>.NET 8</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#4EAA25">
            <span className="badge-icon">
              <SiGnubash />
            </span>
            <span>Bash</span>
          </Styled.ArsenalBadge>
        </Styled.ArsenalBadgeList>
      </Styled.ArsenalRow>

      <Styled.ArsenalRow>
        <Styled.ArsenalRowMeta>
          <span className="rack-title">
            <SiReact /> Web Frameworks
          </span>
          <span className="rack-desc">
            Frontend and backend tools for building modern web platforms.
          </span>
        </Styled.ArsenalRowMeta>
        <Styled.ArsenalBadgeList>
          <Styled.ArsenalBadge>
            <span className="badge-icon">
              <SiNextdotjs />
            </span>
            <span>Next.js</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#00D8FF">
            <span className="badge-icon">
              <SiReact />
            </span>
            <span>React</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#FF2D20">
            <span className="badge-icon">
              <SiLaravel />
            </span>
            <span>Laravel</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#38BDF8">
            <span className="badge-icon">
              <SiTailwindcss />
            </span>
            <span>Tailwind CSS</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#F59E0B">
            <span className="badge-icon">
              <SiWebrtc />
            </span>
            <span>WebRTC</span>
          </Styled.ArsenalBadge>
        </Styled.ArsenalBadgeList>
      </Styled.ArsenalRow>

      <Styled.ArsenalRow>
        <Styled.ArsenalRowMeta>
          <span className="rack-title">
            <FaShieldAlt /> Cloud &amp; Infrastructure
          </span>
          <span className="rack-desc">
            Databases, Linux environments, and deployment tools.
          </span>
        </Styled.ArsenalRowMeta>
        <Styled.ArsenalBadgeList>
          <Styled.ArsenalBadge>
            <span className="badge-icon">
              <FcLinux />
            </span>
            <span>Linux</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#367BF0">
            <span className="badge-icon">
              <SiKalilinux />
            </span>
            <span>Kali Linux</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#4169E1">
            <span className="badge-icon">
              <SiPostgresql />
            </span>
            <span>PostgreSQL</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#DC382D">
            <span className="badge-icon">
              <SiRedis />
            </span>
            <span>Redis</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#2496ED">
            <span className="badge-icon">
              <SiDocker />
            </span>
            <span>Docker</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#0080FF">
            <span className="badge-icon">
              <SiDigitalocean />
            </span>
            <span>DigitalOcean</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#2088FF">
            <span className="badge-icon">
              <SiGithubactions />
            </span>
            <span>GitHub Actions</span>
          </Styled.ArsenalBadge>
          <Styled.ArsenalBadge iconColor="#26A5E4">
            <span className="badge-icon">
              <SiTelegram />
            </span>
            <span>Telegram Bot API</span>
          </Styled.ArsenalBadge>
        </Styled.ArsenalBadgeList>
      </Styled.ArsenalRow>
    </Styled.ArsenalRack>
  </Styled.ArsenalSection>
);

export default SkillsSection;
