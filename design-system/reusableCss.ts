import { css, keyframes } from 'styled-components';

/**
 * @keyframes slidInCenter
 * @returns {keyframes} - slide in animations for card appearance
 * @example animation: ${slidInCenter} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
 */
export const slidInCenter = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

/**
 * portion of styles to make scrollbar visible with unified app style
 * @css showScrollbarStyles
 * @returns {keyframes} - keyframes for windows unmounting
 */

export const showScrollbarStyles = css`
  ::-webkit-scrollbar {
    display: block;
    width: 2px;
    height: 1px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.blue.icon};
  }
`;
