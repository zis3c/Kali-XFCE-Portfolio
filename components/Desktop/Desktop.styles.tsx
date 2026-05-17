import styled from 'styled-components';

export const Container = styled.main`
  position: absolute;
  top: 28px; /* below Xfce panel */
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 28px);
  overflow: hidden;

  /* Kali wallpaper — using user's neon background */
  background:
    url('/kali-neon.png') center/cover no-repeat fixed,
    linear-gradient(135deg, #0e0e1a 0%, #141428 50%, #0e0e1a 100%);
`;
