import React from 'react';
import * as Styled from './Resume.styles';
import TextList from '../TextList/TextList';

import {
  keyTechSkills,
  otherSkills,
  professionalExperience,
} from './Resume.config';
import {
  FiGithub,
  FiGlobe,
  FiMail,
} from 'react-icons/fi';
import { SiLinkedin } from 'react-icons/si';
import PortfolioParagraph from '../Typography/PortfolioParagraph/PortfolioParagraph';
import ProfessionalExperience from '../ProfessionalExperience/ProfessionalExperience';
import Link from 'next/link';

/**
 *Renders resume component
 *@function Resume
 *@returns {JSX.Element} - Rendered CardContent component
 */
const Resume = (): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.ResumeWrapper>
        <Styled.LeftColumn>
          <Styled.ContactInfo>
            <Styled.ContactLink
              href={'https://github.com/zis3c'}
              target="_blank"
              rel="noopener"
            >
              <FiGlobe />
              github.com/zis3c
            </Styled.ContactLink>

            <Styled.ContactLink href="mailto:radzizamri@proton.me">
              <FiMail />
              radzizamri@proton.me
            </Styled.ContactLink>
            <p>Perak, Malaysia ðŸ‡²ðŸ‡¾</p>
          </Styled.ContactInfo>

          <TextList
            variant={'withHeader'}
            textBulletPoints={keyTechSkills}
            headerText={'key technical skills'}
          />

          <TextList
            variant={'withHeader'}
            textBulletPoints={otherSkills}
            headerText={'Other skills'}
          />
        </Styled.LeftColumn>

        <Styled.RightColumn>
          {/*HEADER WITH NAME*/}
          <Styled.SummaryHeader>
            <Styled.Name>
              Radzi <span>Zamri</span>
            </Styled.Name>
            <Styled.Title>
              Cybersecurity Student | Purple Team | Automation & Security Tooling
            </Styled.Title>

            {/*SOCIAL MEDIA LINKS*/}
            <Styled.SocialLinksWrapper>
              <Styled.SocialMediaLink
                href={'https://www.linkedin.com/in/radzizamri/'}
                target={'_blank'}
                rel="noopener"
              >
                <SiLinkedin className={'social-media-icon'} />
                LinkedIn
              </Styled.SocialMediaLink>
              <Styled.SocialMediaLink
                href={'https://github.com/zis3c'}
                target={'_blank'}
                rel="noopener"
              >
                <FiGithub className={'social-media-icon'} />
                GitHub
              </Styled.SocialMediaLink>
              <Styled.SocialMediaLink href="mailto:radzizamri@proton.me">
                <FiMail className={'social-media-icon'} />
                Email
              </Styled.SocialMediaLink>
            </Styled.SocialLinksWrapper>

            <Styled.HR />
            {/*SUMMARY*/}
            <Styled.Summary>
              <Styled.ResumeHeader>Summary</Styled.ResumeHeader>
              <PortfolioParagraph
                margin={'0'}
                paragraphText={`Cybersecurity student at Universiti Sultan Azlan Shah (USAS)
              with hands-on experience in offensive and defensive security,
              automation, and practical security tooling. Purple Team operator
              with skills spanning penetration testing, SIEM log analysis,
              incident response, and secure coding. Passionate about building
              security tools, automating workflows, and competing in CTFs.`}
                withDarkColor={true}
                variant={'medium'}
                withAnimatedPresence={false}
              />
            </Styled.Summary>
          </Styled.SummaryHeader>

          {/*EXPERIENCE*/}

          <Styled.ResumeHeader>Experience</Styled.ResumeHeader>
          <PortfolioParagraph
            margin={'0'}
            paragraphText={
              'Built practical tools and applications for learning and real use. Active in CTF competitions and cybersecurity communities.'
            }
            withDarkColor={true}
            variant={'medium'}
            withAnimatedPresence={false}
          />

          {professionalExperience.map((experience, id) => (
            <ProfessionalExperience key={id} {...experience} />
          ))}
          {/*PROJECTS*/}
          <Styled.ResumeHeader>Highlighted Projects</Styled.ResumeHeader>

          <Styled.Projects>
            <p>
              Links to my projects can be found on{' '}
              <Link href={'https://github.com/zis3c'}>
                github.com/zis3c
              </Link>{' '}
              - including FinVault, Certclaim, STEM Telebot, Tgsortreact,
              USAS Launcher, Assignment Notifier, QRBot, Qrtendify, and
              Polyglot Files.
            </p>
          </Styled.Projects>

          {/* EDUCATION */}
          <Styled.ResumeHeader>Education</Styled.ResumeHeader>

          <Styled.EducationDetails>
            <h4>
              Bachelor of Computer Science
              <span>Cybersecurity</span>
            </h4>
            <Styled.University>
              Universiti Sultan Azlan Shah (USAS)
            </Styled.University>
          </Styled.EducationDetails>
        </Styled.RightColumn>
      </Styled.ResumeWrapper>
    </Styled.Container>
  );
};

export default Resume;


