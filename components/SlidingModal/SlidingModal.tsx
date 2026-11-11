import React, { FC, ReactNode } from 'react';
import * as Styled from './SlidingModal.styles';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export interface SliderProps {
  variant: 'systemTrayModal';
  width: string;
  position: { top?: string; bottom?: string; right?: string; left?: string };
  children?: ReactNode;
}

/**
 *@function SlidingModal
 *@param {number} prop -
 *@returns {JSX.Element} - Rendered CardContent component
 */
const SlidingModal: FC<SliderProps> = ({
  variant,
  width,
  position,
  children,
}): JSX.Element => {
  const { isAppCenterOpen } = useTypedSelector((state) => state.ui);

  return (
    <Styled.Container
      variant={variant}
      width={width}
      position={position}
      isAppCenterOpen={isAppCenterOpen}
    >
      {children}
    </Styled.Container>
  );
};

export default SlidingModal;
