import styled from 'styled-components';

export const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  background: #050707;
  padding: 42px 52px 28px;

  @media (max-width: 900px) {
    padding: 30px 24px 20px;
  }

  @media (max-width: 600px) {
    min-height: 100dvh;
    padding: calc(18px + env(safe-area-inset-top)) 12px
      calc(14px + env(safe-area-inset-bottom));
  }
`;

export const Viewport = styled.div`
  width: min(760px, 100%);
  font-family: 'Consolas', 'Lucida Console', monospace;
`;

export const Bottom = styled.div`
  font-family: 'Consolas', 'Lucida Console', monospace;
`;

export const Header = styled.div`
  color: #b8c3cc;
  font-size: 14px;
  margin-bottom: 4px;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const Subheader = styled.div`
  color: #7f8d99;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 11px;
    line-height: 1.35;
  }
`;

export const Log = styled.div`
  color: #8aa98a;
  font-size: 12px;
  margin-top: 2px;

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 1.3;
  }
`;

export const Title = styled.h1`
  margin: 14px 0 0;
  font-size: 17px;
  color: #c9d3da;

  @media (max-width: 600px) {
    font-size: 15px;
    margin-top: 10px;
  }
`;

export const Subtitle = styled.p`
  margin: 10px 0 0;
  color: #7f8d99;
  font-size: 12px;

  @media (max-width: 600px) {
    font-size: 11px;
    margin-top: 8px;
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 22px;
  width: min(640px, 100%);

  @media (max-width: 600px) {
    margin-top: 12px;
    gap: 8px;
  }
`;

export const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  text-align: left;
  border: 1px solid ${({ isActive }) => (isActive ? '#6f7f86' : 'transparent')};
  background: ${({ isActive }) => (isActive ? '#1d2529' : 'transparent')};
  color: ${({ isActive }) => (isActive ? '#d9e4eb' : '#96a3ac')};
  padding: 8px 10px;
  cursor: pointer;
  font-family: 'Consolas', 'Lucida Console', monospace;
  font-size: 13px;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? '#1d2529' : 'rgba(255,255,255,0.05)'};
  }

  @media (max-width: 600px) {
    min-height: 40px;
    font-size: 12px;
    line-height: 1.35;
  }
`;

export const Footer = styled.div`
  margin-top: 10px;
  color: #707f8a;
  font-size: 11px;

  @media (max-width: 600px) {
    font-size: 10px;
    line-height: 1.35;
  }
`;
