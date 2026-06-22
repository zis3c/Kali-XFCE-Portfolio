import React from 'react';
import * as Styled from './About.styles';
import Paragraph from '../Typography/Paragraph/Paragraph';
import WithSparkles from '../Portfolio/WithSparkles/WithSparkles';
import Image from 'next/image';

/**
 *Renders content for "about" window with basic info about OS
 *@function About
 *@returns {JSX.Element} - Rendered About component
 */
const About = (): JSX.Element => {
  return (
    <Styled.Container>
      <Styled.Header>
        <Styled.Figure>
          <Image
            src="/assets/portfolio/skills/linux-original.svg"
            height={100}
            width={100}
            style={{ objectFit: 'contain' }}
            alt={'Kali Linux'}
          />
          <Styled.Figcaption>
            <WithSparkles color={'rgb(54, 123, 240)'}>
              <h1>Kali Linux</h1>
            </WithSparkles>
          </Styled.Figcaption>
        </Styled.Figure>
      </Styled.Header>
      <Styled.InfoWrapper>
        <Paragraph margin={'1rem 0'}>
          Kali GNU/Linux Rolling | Xfce 4.18
        </Paragraph>
        <Paragraph margin={'1rem 0'}>Built by Radzi Zamri (zis3c)</Paragraph>
        <Paragraph margin={'1rem 0'}>
          Cybersecurity Student | Purple Team
        </Paragraph>
        <Paragraph margin={'1rem 0'}>CTF Team: Dot Zero</Paragraph>
        <Paragraph margin={'1rem 0'}>
          Universiti Sultan Azlan Shah (USAS)
        </Paragraph>
        <Paragraph margin={'2rem 0'}>
          This interactive portfolio simulates a Kali Linux Xfce desktop
          environment. All features are frontend-only and safe.
        </Paragraph>
        <Paragraph margin={'1rem 0'}>
          <Styled.A
            href={'https://github.com/zis3c'}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </Styled.A>
          {' · '}
          <Styled.A
            href={'https://www.linkedin.com/in/radzizamri/'}
            target="_blank"
            rel="noopener"
          >
            LinkedIn
          </Styled.A>
          {' · '}
          <Styled.A
            href={'https://www.instagram.com/radz.z_/'}
            target="_blank"
            rel="noopener"
          >
            Instagram
          </Styled.A>
          {' · '}
          <Styled.A
            href={'https://www.youtube.com/@zis3c'}
            target="_blank"
            rel="noopener"
          >
            YouTube
          </Styled.A>
        </Paragraph>
      </Styled.InfoWrapper>
    </Styled.Container>
  );
};

export default About;
