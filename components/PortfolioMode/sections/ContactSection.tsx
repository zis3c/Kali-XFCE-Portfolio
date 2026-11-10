import React from 'react';
import { FaGithub } from 'react-icons/fa';
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
            Feel free to connect on GitHub. Open to reverse engineering
            discussions, security tool development, and open-source projects.
          </p>
        </Styled.CommsInfo>
        <Styled.ProjectButtonGroup style={{ width: 'auto' }}>
          <Styled.ProjectOpenLink
            href="https://github.com/zis3c"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub /> GitHub (@zis3c)
          </Styled.ProjectOpenLink>
        </Styled.ProjectButtonGroup>
      </Styled.CommsBody>
      <Styled.HotkeyBar>
        <span>
          <kbd>J</kbd>/<kbd>K</kbd> Scroll
        </span>
        <span>
          <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> Select Project
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
