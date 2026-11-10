import React from 'react';
import {
  FaFlag,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import * as Styled from './PortfolioMode.styles';

const PortfolioFooter = (): JSX.Element => (
  <Styled.Footer>
    <Styled.FooterContainer>
      <Styled.FooterBottom>
        <span>
          &copy; {new Date().getFullYear()} Radzi Zamri. Open source under MIT
          License.
        </span>
        <Styled.FooterSocialList aria-label="Social profiles">
          <a
            href="https://github.com/zis3c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/radzizamri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://ctftime.org/team/421634"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Dot Zero CTFtime team profile"
          >
            <FaFlag />
          </a>
          <a
            href="https://www.youtube.com/@zis3c"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.instagram.com/radz.z_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
          >
            <FaInstagram />
          </a>
        </Styled.FooterSocialList>
      </Styled.FooterBottom>
    </Styled.FooterContainer>
  </Styled.Footer>
);

export default PortfolioFooter;
