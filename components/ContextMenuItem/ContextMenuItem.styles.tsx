import styled from 'styled-components';
import { IContextMenuItem } from './ContextMenuItem';

type ContainerProps = Pick<IContextMenuItem, 'withUnderline'>;

export const Container = styled.li<ContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 10px 4px 6px;
  cursor: pointer;
  border-bottom: ${({ withUnderline }) =>
    withUnderline ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'};
  margin-bottom: ${({ withUnderline }) => (withUnderline ? '2px' : '0')};

  &:hover {
    background: #3e445e;
  }

  p {
    font-size: 11px;
    color: #d0d5dc;
    font-family: 'Inter', 'Noto Sans', sans-serif;
    font-weight: 400;
    text-transform: none;
    white-space: nowrap;
    margin: 0;
  }

  /* Chevron arrow for submenus */
  > .icon {
    font-size: 11px;
    color: rgba(180, 185, 195, 0.5);
    flex-shrink: 0;
  }
`;

interface Props {
  isContextMenuShown: boolean;
  distanceFromMainContainer: number;
}

export const ContextMenuWrapper = styled.aside<Props>`
  position: absolute;
  top: -3px;
  left: 100%;
  margin-left: 0;

  visibility: ${({ isContextMenuShown }) =>
    isContextMenuShown ? 'visible' : 'hidden'};
`;

export const TextIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 12px;
    color: rgba(180, 185, 195, 0.6);
  }
`;
