import React, { FC, useCallback, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import * as Styled from './Window.styles';
import { MinimizeIcon, MaximizeIcon, CloseIcon } from '../icons/KaliIcons';
import { generateRandomNumberInRange } from '../../utils/helper-functions';

export interface Props {
  windowName: string;
  windowIcon: string;
  size: { height: number; width: number };
  isOpen: boolean;
  isActive: boolean;
  closeWindow: () => void;
  focusWindow: () => void;
  minimizeWindow: () => void;
}

const panelHeight = 28;

/**
 * Xfwm4-style draggable window
 */
const Window: FC<Props> = ({
  size,
  windowName,
  children,
  isOpen,
  isActive,
  closeWindow,
  focusWindow,
  minimizeWindow,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  windowIcon,
}) => {
  const shiftOnX = generateRandomNumberInRange(-100, 80);
  const shiftOnY = generateRandomNumberInRange(0, 60);
  const [isWindowExpanded, setIsWindowExpanded] = useState(false);
  const [clientWidth, setClientWidth] = useState(800);
  const [clientHeight, setClientHeight] = useState(600);
  const [windowPosition, setWidowPosition] = useState({
    x: (clientWidth + shiftOnX) / 2,
    y: panelHeight + shiftOnY,
  });
  const [windowSize, setWindowSize] = useState({
    width: size.width,
    height: size.height,
  });

  const handleCloseWindow = useCallback(() => {
    setIsWindowExpanded(false);
    closeWindow();
  }, [closeWindow]);

  useEffect(() => {
    setClientWidth(document.body.clientWidth);
    setClientHeight(document.body.clientHeight);
  }, []);

  return (
    <Rnd
      size={{
        width: isWindowExpanded ? clientWidth : windowSize.width,
        height: isWindowExpanded
          ? clientHeight - panelHeight
          : windowSize.height,
      }}
      position={{
        x: isWindowExpanded ? 0 : windowPosition.x,
        y: isWindowExpanded ? panelHeight : windowPosition.y,
      }}
      onDragStop={(e, d) => {
        setWidowPosition({ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref) => {
        setWindowSize({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
      }}
      minWidth="280"
      minHeight="180"
      bounds="parent"
      dragHandleClassName="xfce-titlebar"
      onMouseDown={focusWindow}
    >
      <Styled.Container isOpen={isOpen} isActive={isActive}>
        <Styled.TitleBar className="xfce-titlebar" isActive={isActive}>
          <Styled.WindowTitle>{windowName}</Styled.WindowTitle>
          <Styled.ButtonGroup>
            <Styled.WinButton
              variant="minimize"
              onClick={minimizeWindow}
              title="Minimize"
            >
              <MinimizeIcon size={10} />
            </Styled.WinButton>
            <Styled.WinButton
              variant="maximize"
              onClick={() => setIsWindowExpanded((prev) => !prev)}
              title={isWindowExpanded ? 'Restore' : 'Maximize'}
            >
              <MaximizeIcon size={10} />
            </Styled.WinButton>
            <Styled.WinButton
              variant="close"
              onClick={handleCloseWindow}
              title="Close"
            >
              <CloseIcon size={10} />
            </Styled.WinButton>
          </Styled.ButtonGroup>
        </Styled.TitleBar>
        <Styled.Content>{children}</Styled.Content>
      </Styled.Container>
    </Rnd>
  );
};

export default Window;
