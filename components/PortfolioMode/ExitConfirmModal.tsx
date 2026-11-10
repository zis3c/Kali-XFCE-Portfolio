import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiPower } from 'react-icons/fi';
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
  from { opacity: 0; transform: translateY(10px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(2, 4, 8, 0.62);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.18s ease both;
`;

const Card = styled.div<{ $themeMode: SimpleTheme }>`
  width: min(420px, 100%);
  padding: 28px 26px 22px;
  border-radius: 18px;
  text-align: center;
  border: 1px solid
    ${({ $themeMode }) =>
      $themeMode === 'terminal'
        ? 'rgba(148, 163, 184, 0.22)'
        : 'rgba(15, 23, 42, 0.12)'};
  background: ${({ $themeMode }) =>
    $themeMode === 'terminal'
      ? 'linear-gradient(180deg, rgba(24, 28, 36, 0.99) 0%, rgba(11, 14, 20, 0.99) 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)'};
  box-shadow: 0 32px 90px rgba(0, 0, 0, 0.62),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation: ${popIn} 0.22s cubic-bezier(0.2, 0.9, 0.3, 1) both;
`;

const IconRing = styled.div`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin: 0 auto 16px;
  border-radius: 50%;
  color: #f87171;
  background: radial-gradient(
    circle at 30% 25%,
    rgba(248, 113, 113, 0.3),
    rgba(190, 24, 93, 0.12) 60%,
    transparent 72%
  );
  border: 1px solid rgba(248, 113, 113, 0.4);
  box-shadow: 0 0 24px rgba(239, 68, 68, 0.25);
  font-size: 22px;
`;

const Title = styled.h3<{ $themeMode: SimpleTheme }>`
  margin: 0;
  font-size: 19px;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#f8fafc' : '#0f172a'};
`;

const Message = styled.p<{ $themeMode: SimpleTheme }>`
  margin: 9px auto 22px;
  max-width: 32ch;
  font-size: 13px;
  line-height: 1.55;
  color: ${({ $themeMode }) =>
    $themeMode === 'terminal' ? '#94a3b8' : '#475569'};
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 420px) {
    flex-direction: column-reverse;
  }
`;

const Button = styled.button<{
  $variant: 'cancel' | 'confirm';
  $themeMode: SimpleTheme;
}>`
  flex: 1;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.14s ease, box-shadow 0.14s ease, background 0.14s ease;

  &:focus-visible {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
  }

  &:hover {
    transform: translateY(-1px);
  }

  ${({ $variant, $themeMode }) =>
    $variant === 'confirm'
      ? `
    border: 1px solid rgba(248, 113, 113, 0.55);
    color: #fff;
    background: linear-gradient(180deg, #ef4444 0%, #b91c1c 100%);
    box-shadow: 0 8px 20px rgba(185, 28, 28, 0.32);

    &:hover {
      box-shadow: 0 10px 26px rgba(185, 28, 28, 0.42);
    }
  `
      : `
    border: 1px solid ${
      $themeMode === 'terminal'
        ? 'rgba(148, 163, 184, 0.3)'
        : 'rgba(15, 23, 42, 0.16)'
    };
    color: ${$themeMode === 'terminal' ? '#e2e8f0' : '#334155'};
    background: ${
      $themeMode === 'terminal' ? 'rgba(255, 255, 255, 0.04)' : '#ffffff'
    };
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);

    &:hover {
      background: ${
        $themeMode === 'terminal'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(15, 23, 42, 0.04)'
      };
    }
  `};
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
        <IconRing>
          <FiPower />
        </IconRing>
        <Title id="exit-portfolio-title" $themeMode={themeMode}>
          Leave Portfolio Mode?
        </Title>
        <Message $themeMode={themeMode}>
          Return to the boot menu? You can switch back to Kali Linux XFCE mode
          from there.
        </Message>
        <Actions>
          <Button
            type="button"
            $variant="cancel"
            $themeMode={themeMode}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="button"
            $variant="confirm"
            $themeMode={themeMode}
            onClick={onConfirm}
          >
            <FiPower /> Return to Boot Menu
          </Button>
        </Actions>
      </Card>
    </Overlay>
  );
};

export default ExitConfirmModal;
