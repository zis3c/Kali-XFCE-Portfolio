import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiAlertTriangle, FiCornerUpLeft } from 'react-icons/fi';
import type { SimpleTheme } from './PortfolioMode.data';

interface Props {
  isOpen: boolean;
  themeMode: SimpleTheme;
  onCancel: () => void;
  onConfirm: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const popIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: ${fadeIn} 0.18s ease both;
`;

const Card = styled.div<{ $themeMode: SimpleTheme }>`
  width: min(440px, 100%);
  padding: 28px 24px 22px;
  border-radius: 14px;
  text-align: left;
  border: 1px solid
    ${({ $themeMode }) => ($themeMode === 'terminal' ? '#27272a' : '#e4e4e7')};
  background: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#09090b' : '#ffffff'};
  box-shadow: ${({ $themeMode }) =>
    $themeMode === 'terminal'
      ? '0 24px 60px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      : '0 24px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.04)'};
  animation: ${popIn} 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter',
    sans-serif;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const IconBadge = styled.div<{ $themeMode: SimpleTheme }>`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 17px;
  background: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#18181b' : '#f4f4f5'};
  border: 1px solid
    ${({ $themeMode }) => ($themeMode === 'terminal' ? '#27272a' : '#e4e4e7')};
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#fafafa' : '#09090b'};
`;

const Title = styled.h3<{ $themeMode: SimpleTheme }>`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#fafafa' : '#09090b'};
`;

const Message = styled.p<{ $themeMode: SimpleTheme }>`
  margin: 0 0 20px;
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#a1a1aa' : '#71717a'};
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-top: 14px;
  border-top: 1px solid inherit;

  @media (max-width: 440px) {
    flex-direction: column-reverse;
    > button {
      width: 100%;
    }
  }
`;

const CancelButton = styled.button<{ $themeMode: SimpleTheme }>`
  height: 36px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid
    ${({ $themeMode }) => ($themeMode === 'terminal' ? '#27272a' : '#e4e4e7')};
  background: transparent;
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#a1a1aa' : '#71717a'};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $themeMode }) =>
      $themeMode === 'terminal' ? '#18181b' : '#f4f4f5'};
    color: ${({ $themeMode }) =>
      $themeMode === 'terminal' ? '#fafafa' : '#09090b'};
    border-color: ${({ $themeMode }) =>
      $themeMode === 'terminal' ? '#3f3f46' : '#d4d4d8'};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ $themeMode }) => ($themeMode === 'terminal' ? '#fafafa' : '#09090b')};
    outline-offset: 2px;
  }
`;

const ConfirmButton = styled.button<{ $themeMode: SimpleTheme }>`
  height: 36px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  background: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#fafafa' : '#09090b'};
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#09090b' : '#fafafa'};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $themeMode }) =>
      $themeMode === 'terminal' ? '#e4e4e7' : '#27272a'};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ $themeMode }) => ($themeMode === 'terminal' ? '#fafafa' : '#09090b')};
    outline-offset: 2px;
  }
`;

const ExitConfirmModal = ({
  isOpen,
  themeMode,
  onCancel,
  onConfirm,
}: Props): JSX.Element | null => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onCancel}>
      <Card
        $themeMode={themeMode}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-portfolio-title"
        onClick={(event) => event.stopPropagation()}
      >
        <HeaderRow>
          <IconBadge $themeMode={themeMode}>
            <FiAlertTriangle />
          </IconBadge>
          <Title id="exit-portfolio-title" $themeMode={themeMode}>
            Leave Portfolio Mode?
          </Title>
        </HeaderRow>
        <Message $themeMode={themeMode}>
          Return to the boot menu? You can switch back to Kali Linux XFCE mode
          from there.
        </Message>
        <Actions
          style={{
            borderColor: themeMode === 'terminal' ? '#18181b' : '#f4f4f5',
          }}
        >
          <CancelButton type="button" $themeMode={themeMode} onClick={onCancel}>
            Cancel
          </CancelButton>
          <ConfirmButton
            type="button"
            $themeMode={themeMode}
            onClick={onConfirm}
          >
            <FiCornerUpLeft /> Return to Boot Menu
          </ConfirmButton>
        </Actions>
      </Card>
    </Overlay>
  );
};

export default ExitConfirmModal;
