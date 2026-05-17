import styled from 'styled-components';

export const Container = styled.header`
  /* Xfce top panel: compact, slightly textured */
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.navigation};
  width: 100%;
  height: 28px;
  background: linear-gradient(
    180deg,
    rgba(43, 46, 53, 0.98) 0%,
    rgba(35, 38, 45, 0.98) 55%,
    rgba(30, 33, 40, 0.98) 100%
  );
  border-bottom: 1px solid rgba(8, 10, 12, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  padding: 0;
  user-select: none;
`;

export const LeftZone = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex-shrink: 0;
`;

export const ApplicationsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 32px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: rgba(200, 205, 210, 0.9);
  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }

  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const CenterZone = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  overflow-x: auto;
  gap: 0;
  padding: 0 2px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TaskButton = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 26px;
  padding: 0;
  background: ${({ isActive }) =>
    isActive ? 'rgba(106, 154, 222, 0.28)' : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid
    ${({ isActive }) =>
      isActive ? 'rgba(106, 154, 222, 0.72)' : 'rgba(80, 80, 80, 0.3)'};
  border-radius: 0;
  cursor: pointer;
  color: rgba(200, 205, 210, 0.9);
  flex-shrink: 0;
  margin-left: -1px;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const RightZone = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  flex-shrink: 0;
`;

export const PanelMenu = styled.div`
  position: fixed;
  min-width: 170px;
  background: linear-gradient(180deg, #2a2d34 0%, #24272e 100%);
  border: 1px solid rgba(8, 10, 12, 0.92);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.5);
  z-index: 9999;
  padding: 4px 0;
`;

export const PanelItem = styled.button`
  width: 100%;
  border: 0;
  background: transparent;
  color: rgba(210, 216, 224, 0.95);
  text-align: left;
  font-size: 11px;
  padding: 6px 12px;
  cursor: pointer;

  &:hover {
    background: rgba(106, 154, 222, 0.35);
  }
`;
