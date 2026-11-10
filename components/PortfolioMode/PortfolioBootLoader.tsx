import React from 'react';
import * as Styled from './PortfolioMode.styles';

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
}

const PortfolioBootLoader = ({
  isOpen,
  onDismiss,
}: Props): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <Styled.BootLoaderOverlay onClick={onDismiss}>
      <Styled.BootLoaderCard>
        <div className="spinner-ring" aria-hidden="true" />
        <p className="spinner-title">Loading Portfolio Mode...</p>
        <p className="spinner-sub">Preparing projects and GitHub stats</p>
        <div className="spinner-bar" />
      </Styled.BootLoaderCard>
    </Styled.BootLoaderOverlay>
  );
};

export default PortfolioBootLoader;
