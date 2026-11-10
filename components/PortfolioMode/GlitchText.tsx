import React, { useEffect, useState } from 'react';
import * as Styled from './PortfolioMode.styles';

interface GlitchTextProps {
  words: string[];
}

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
    let intervalId: number | undefined;

    const startTimer = window.setTimeout(() => {
      let deleteStep = 0;
      let typeStep = 0;

      intervalId = window.setInterval(() => {
        if (deleteStep < currentWord.length) {
          deleteStep += 1;
          setText(currentWord.slice(0, currentWord.length - deleteStep));
        } else if (typeStep < nextWord.length) {
          typeStep += 1;
          setText(nextWord.slice(0, typeStep));
        } else {
          window.clearInterval(intervalId);
          setText(nextWord);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, 24);
    }, 3000);

    return () => {
      window.clearTimeout(startTimer);
      if (intervalId) {
        window.clearInterval(intervalId);
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
