import React, { useEffect, useState } from 'react';
import * as Styled from './PortfolioMode.styles';

interface GlitchTextProps {
  words: string[];
}

const GLITCH_CHARS = '0123456789ABCDEF!@#$%^&*()+-=[]{}|;:,.<>?~/\\*+=~';

const GlitchText: React.FC<GlitchTextProps> = ({ words }) => {
  const [text, setText] = useState(words[0] || '');
  const [wordIndex, setWordIndex] = useState(0);

  const longestWord = words.reduce(
    (max, current) => (current.length > max.length ? current : max),
    words[0] || ''
  );

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length] || '';
    const nextWord = words[(wordIndex + 1) % words.length] || '';
    const maxLength = Math.max(currentWord.length, nextWord.length);
    let glitchInterval: number | undefined;

    const startTimer = window.setTimeout(() => {
      let revealProgress = 0;

      glitchInterval = window.setInterval(() => {
        const rendered = Array.from({ length: maxLength }, (_, index) => {
          if (index < revealProgress) {
            return nextWord[index] || '';
          }
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }).join('');

        setText(rendered);
        revealProgress += 0.6;

        if (revealProgress >= nextWord.length) {
          window.clearInterval(glitchInterval);
          setText(nextWord);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 30);
    }, 2800);

    return () => {
      window.clearTimeout(startTimer);
      if (glitchInterval) {
        window.clearInterval(glitchInterval);
      }
    };
  }, [wordIndex, words]);

  return (
    <Styled.GlitchWrap>
      <Styled.GlitchGhost>{longestWord}</Styled.GlitchGhost>
      <Styled.GlitchLive>{text}</Styled.GlitchLive>
    </Styled.GlitchWrap>
  );
};

export default GlitchText;
