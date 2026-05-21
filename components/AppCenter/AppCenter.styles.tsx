import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: calc(100vh - 40px);
  overflow: hidden;
  font-family: 'Noto Sans', 'Cantarell', 'Segoe UI', sans-serif;
  background: linear-gradient(180deg, #1f232a 0%, #171b22 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
`;

export const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 7px 8px;
  border-bottom: 1px solid rgba(8, 10, 12, 0.7);
  background: linear-gradient(180deg, #2b3039 0%, #252a33 100%);
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 5px 7px 5px 26px;
  background: rgba(10, 12, 16, 0.75);
  border: 1px solid rgba(90, 100, 112, 0.4);
  border-radius: 0;
  color: rgba(200, 205, 210, 0.9);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 11px;
  outline: none;

  &:focus {
    border-color: rgba(54, 123, 240, 0.45);
  }

  &::placeholder {
    color: rgba(120, 130, 140, 0.4);
  }
`;

export const MenuBody = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const CategorySidebar = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  min-width: 130px;
  background: rgba(14, 16, 21, 0.78);
  border-right: 1px solid rgba(8, 10, 12, 0.7);
  padding: 4px 0;
  overflow-y: auto;
`;

interface CategoryItemProps {
  isActive: boolean;
}

export const CategoryItem = styled.button<CategoryItemProps>`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  padding: 5px 8px;
  background: ${({ isActive }) =>
    isActive ? 'rgba(54, 123, 240, 0.18)' : 'transparent'};
  border: none;
  border-left: 2px solid ${({ isActive }) =>
    isActive ? '#367bf0' : 'transparent'};
  outline: none;
  cursor: pointer;
  color: rgba(190, 195, 200, 0.85);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10.5px;
  font-weight: 400;
  text-align: left;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  span {
    white-space: nowrap;
  }
`;

export const AppList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
  background: rgba(18, 20, 26, 0.82);
`;

export const AppItem = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 5px 10px;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: rgba(190, 195, 200, 0.85);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 11px;
  text-align: left;

  background: ${({ isActive }) =>
    isActive ? 'rgba(54, 123, 240, 0.18)' : 'transparent'};

  &:hover {
    background: rgba(54, 123, 240, 0.12);
  }
`;

export const AppIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const AppName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoResults = styled.div`
  padding: 14px;
  color: rgba(130, 140, 150, 0.5);
  font-size: 10px;
  text-align: center;
`;

export const MenuFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-top: 1px solid rgba(8, 10, 12, 0.7);
  background: linear-gradient(180deg, #2b3039 0%, #242a33 100%);
`;

export const FooterUser = styled.span`
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10px;
  color: rgba(140, 150, 160, 0.5);
`;

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const FooterButton = styled.button`
  min-width: 56px;
  padding: 2px 8px;
  border: 1px solid rgba(120, 130, 140, 0.35);
  background: linear-gradient(180deg, #3a404b 0%, #303640 100%);
  color: rgba(212, 218, 226, 0.94);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  font-size: 10px;
  cursor: pointer;

  &:hover {
    background: linear-gradient(180deg, #475061 0%, #394150 100%);
  }
`;

/* Legacy exports for backward compat */
export const AllApps = styled.div``;
export const SectionHeader = styled.div``;
export const Footer = styled.footer``;
export const PowerOff = styled.button``;
export const SearchBarForm = styled.form``;
export const InitialScreen = styled.div``;
export const AllAppsList = styled.div``;
