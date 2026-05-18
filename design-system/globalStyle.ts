import { createGlobalStyle } from 'styled-components';
/*
 * Styled components global style configuration
 * Kali Linux Xfce Theme
 * */
export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    color: ${({ theme }) => theme.primary.text};
    background: ${({ theme }) => theme.primary.background};
    font-family: 'Noto Sans', 'Cantarell', 'Segoe UI', sans-serif;
    font-size: 12px;
    line-height: 1.4;
    
    /* 3. Phosphor glow & 6. Minimal RGB/chromatic separation */
    text-shadow: 
      0.3px 0 0.5px rgba(255, 0, 0, 0.25),
      -0.3px 0 0.5px rgba(0, 255, 255, 0.25);
  }

  html,
  body {
    height: 100%;
    overflow: auto;
  }

  .icon {
    color: ${({ theme }) => theme.primary.text};
  }

  /* Xfce-style thin scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(14, 14, 26, 0.5);
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(54, 123, 240, 0.3);
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(54, 123, 240, 0.5);
  }

  /* Selection color */
  ::selection {
    background: rgba(34, 197, 94, 0.4);
    color: #ffffff;
  }
`;
