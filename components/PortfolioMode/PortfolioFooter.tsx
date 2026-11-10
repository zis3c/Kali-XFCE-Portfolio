import React from 'react';
import {
  FaFlag,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import * as Styled from './PortfolioMode.styles';

interface Props {
  jumpTo: (id: string) => void;
}

const PortfolioFooter = ({ jumpTo }: Props): JSX.Element => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Styled.Footer>
      <Styled.FooterContainer>
        <Styled.FooterTop>
          <Styled.FooterBrand>
            <div className="brand-header">
              <Styled.StatusLed title="Online" />
              <span>Radzi (zis3c)</span>
            </div>
            <p className="brand-desc">
              Computer Science student, cybersecurity researcher &amp; software
              builder. Focused on reverse engineering, web security, and
              practical student automation tools.
            </p>
            <span className="brand-location">
              Malaysia · UTC+8 · Dot Zero CTF Team
            </span>
          </Styled.FooterBrand>

          <Styled.FooterNavLinks>
            <Styled.BackToTopButton
              type="button"
              onClick={scrollToTop}
              title="Scroll to top of page"
            >
              <FiArrowUp /> Back to top
            </Styled.BackToTopButton>

            <Styled.FooterLinksRow aria-label="Footer navigation">
              <button type="button" onClick={() => jumpTo('simple-about')}>
                About
              </button>
              <button type="button" onClick={() => jumpTo('simple-craft')}>
                What I Do
              </button>
              <button type="button" onClick={() => jumpTo('simple-projects')}>
                Projects
              </button>
              <button type="button" onClick={() => jumpTo('simple-journey')}>
                Experience
              </button>
              <button type="button" onClick={() => jumpTo('simple-skills')}>
                Skills
              </button>
              <button type="button" onClick={() => jumpTo('simple-contact')}>
                Contact
              </button>
            </Styled.FooterLinksRow>
          </Styled.FooterNavLinks>
        </Styled.FooterTop>

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
};

export default PortfolioFooter;
