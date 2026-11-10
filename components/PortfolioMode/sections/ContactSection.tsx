import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import * as Styled from '../PortfolioMode.styles';

const ContactSection = (): JSX.Element => (
  <Styled.ContactSection id="simple-contact">
    <Styled.SectionHeader>
      <Styled.SectionTitle>
        <FiMail />
        <span>Get in Touch</span>
      </Styled.SectionTitle>
      <Styled.SectionSubtitle>
        Interested in collaborating, discussing cybersecurity research, or
        checking out my work? Feel free to connect with me.
      </Styled.SectionSubtitle>
    </Styled.SectionHeader>

    <Styled.CommsTerminal>
      <Styled.CommsBody>
        <Styled.CommsInfo>
          <h3>Direct Channels</h3>
          <p>
            Feel free to connect directly via GitHub, LinkedIn, or Email. Open
            to reverse engineering discussions, security tool development, and
            open-source collaborations.
          </p>
        </Styled.CommsInfo>
        <Styled.ProjectButtonGroup
          style={{ width: 'auto', flexWrap: 'wrap', gap: '10px' }}
        >
          <Styled.ContactLink
            href="https://github.com/zis3c"
            target="_blank"
            rel="noopener noreferrer"
            $brandColor="#e2e8f0"
          >
            <FaGithub /> GitHub
          </Styled.ContactLink>
          <Styled.ContactLink
            href="https://linkedin.com/in/radzizamri"
            target="_blank"
            rel="noopener noreferrer"
            $brandColor="#0A66C2"
          >
            <FaLinkedin /> LinkedIn
          </Styled.ContactLink>
          <Styled.ContactLink
            href="mailto:radzizamri@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            $brandColor="#EA4335"
          >
            <FiMail /> Email
          </Styled.ContactLink>
        </Styled.ProjectButtonGroup>
      </Styled.CommsBody>
      <Styled.HotkeyBar>
        <span>
          <kbd>J</kbd>/<kbd>K</kbd> Scroll
        </span>
        <span>
          <kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd>{' '}
          <kbd>&rarr;</kbd> Select Project
        </span>
        <span>
          <kbd>Enter</kbd> Open Project
        </span>
        <span>
          <kbd>Ctrl+K</kbd> Quick Menu
        </span>
      </Styled.HotkeyBar>
    </Styled.CommsTerminal>
  </Styled.ContactSection>
);

export default ContactSection;
