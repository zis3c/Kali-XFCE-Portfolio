import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 2px;
`;

export const TrayIcon = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 100%;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: rgba(180, 185, 190, 0.7);

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &:hover > div {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  min-width: 170px;
  padding: 6px 8px;
  background: linear-gradient(180deg, #2a2d34 0%, #24272e 100%);
  border: 1px solid rgba(8, 10, 12, 0.92);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
  font-size: 10px;
  color: rgba(210, 216, 224, 0.95);
  text-align: left;
  opacity: 0;
  transform: translateY(-3px);
  pointer-events: none;
  transition: 0.14s ease;
  z-index: 999;

  div + div {
    margin-top: 3px;
    color: rgba(175, 184, 194, 0.94);
  }
`;

/* Legacy exports kept for backward compatibility */
export const Tray = styled.div``;
export const Settings = styled.div``;
