import React from 'react';
import * as Styled from './PortfolioMode.styles';

interface PaletteAction {
  label: string;
  run: () => void;
}

interface Props {
  isOpen: boolean;
  actions: PaletteAction[];
  paletteIndex: number;
  onClose: () => void;
}

const CommandPalette = ({
  isOpen,
  actions,
  paletteIndex,
  onClose,
}: Props): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <Styled.PaletteOverlay onClick={onClose}>
      <Styled.PalettePanel
        role="dialog"
        aria-modal="true"
        aria-label="Quick Jump Menu"
        onClick={(event) => event.stopPropagation()}
      >
        <Styled.PaletteTitle>
          Quick Jump (Use Up/Down &amp; Enter)
        </Styled.PaletteTitle>
        {actions.map((action, index) => (
          <Styled.PaletteItem
            key={action.label}
            isActive={index === paletteIndex}
            onClick={() => {
              action.run();
              onClose();
            }}
          >
            {action.label}
          </Styled.PaletteItem>
        ))}
      </Styled.PalettePanel>
    </Styled.PaletteOverlay>
  );
};

export default CommandPalette;
