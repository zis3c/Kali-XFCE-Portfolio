import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import * as Styled from './PortfolioMode.styles';
import type { SimpleTheme } from './PortfolioMode.data';

interface Props {
  themeMode: SimpleTheme;
}

const ScrollToTopButton = ({ themeMode }: Props): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Styled.ScrollToTopFab
      themeMode={themeMode}
      $visible={isVisible}
      onClick={handleScrollToTop}
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <FiArrowUp />
    </Styled.ScrollToTopFab>
  );
};

export default ScrollToTopButton;
