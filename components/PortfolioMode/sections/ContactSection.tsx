import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import * as Styled from '../PortfolioMode.styles';

const ContactSection = (): JSX.Element => (
  <Styled.ContactSection id="simple-contact">
    <Styled.CommsTerminal>
      <Styled.CommsBody>
        <Styled.CommsInfo>
          <h3>Get in Touch</h3>
          <p>
            Interested in collaborating, talking about cybersecurity, or
            checking out my code? Feel free to connect with me on GitHub or
            LinkedIn.
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
          <Styled.ProjectDemoLink
            href="https://linkedin.com/in/radzizamri"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin /> LinkedIn
          </Styled.ProjectDemoLink>
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
