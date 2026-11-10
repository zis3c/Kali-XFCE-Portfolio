import React, { FC, useState, ReactNode } from 'react';
import * as Styled from './WithSparkles.styles';
import { generateSparkle, ISparkle } from './WithSparkles.config';
import { useRandomInterval } from '../../../hooks/useRandomInterval';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import Sparkle from './Sparkle';
import { range } from '../../../utils';

interface Props {
  color: string;
  children?: ReactNode;
}

/**
 *Renders withSparkles wrapper that adds sparkles of specified configuration to any wrapped children
 * https://www.joshwcomeau.com/react/animated-sparkles-in-react/  `
 *@function WithSparkles
 *@param {string} color - specifies color of sparkles
 *@returns {JSX.Element} - Rendered WithSparkles component
 */
const WithSparkles: FC<Props> = ({ color, children }): JSX.Element => {
  const [sparkles, setSparkles] = useState<ISparkle[]>(() => {
    return range(0, 3).map(() => generateSparkle(color));
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();

      setSparkles((currentSparkles) => [
        ...currentSparkles.filter((currentSparkle) => {
          const delta = now - currentSparkle.createdAt;
          return delta < 750;
        }),
        sparkle,
      ]);
    },
    prefersReducedMotion ? 0 : 50,
    prefersReducedMotion ? 0 : 450
  );

  return (
    <Styled.Container>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <Styled.ChildWrapper>{children}</Styled.ChildWrapper>
    </Styled.Container>
  );
};

export default WithSparkles;
