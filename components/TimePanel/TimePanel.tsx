import React from 'react';
import * as Styled from './TimePanel.styles';
import Clock from '../Clock/Clock';

/**
 *Renders compact time and date display for Xfce panel
 *@function TimePanel
 *@returns {JSX.Element} - Rendered TimePanel component
 */
const TimePanel = (): JSX.Element => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return (
    <Styled.Container>
      <Clock variant={'middleFont'} />
      <Styled.DateText>{currentDate}</Styled.DateText>
    </Styled.Container>
  );
};

export default TimePanel;
