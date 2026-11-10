import React, { ReactNode, useCallback, useRef, useState } from 'react';
import * as Styled from './DesktopIconButton.styles';
import Paragraph from '../Typography/Paragraph/Paragraph';
import Image from 'next/image';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import AppContextMenu from '../AppContextMenu/AppContextMenu';
import { useCloseModalIfClickedOutside } from '../../hooks/useCloseIfClickedOutside';
import {
  TerminalIcon,
  FileManagerIcon,
  UserIcon,
  FolderIcon,
  CodeIcon,
  MailIcon,
  SettingsIcon,
  TextFileIcon,
} from '../icons/KaliIcons';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant: 'desktop' | 'systemTray' | 'pinnedApp' | 'recommendedApp';
  willOpenWindowWith: ReactNode | null;
  iconSrc: string;
  iconSize: { height: number; width: number };
  text: string;
  action: null | (() => void);
  details?: string;
  isSelected?: boolean;
  onSelect?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Maps Kali icon identifiers to SVG icon components
 */
const getKaliIcon = (iconSrc: string, size: number): React.ReactNode | null => {
  const iconColor = '#8899aa';
  switch (iconSrc) {
    case 'KALI_TERMINAL':
      return <TerminalIcon size={size} color={iconColor} />;
    case 'KALI_FILEMANAGER':
      return <FileManagerIcon size={size} color={iconColor} />;
    case 'KALI_USER':
      return <UserIcon size={size} color={iconColor} />;
    case 'KALI_FOLDER':
      return <FolderIcon size={size} color={iconColor} />;
    case 'KALI_CODE':
      return <CodeIcon size={size} color={iconColor} />;
    case 'KALI_MAIL':
      return <MailIcon size={size} color={iconColor} />;
    case 'KALI_SETTINGS':
      return <SettingsIcon size={size} color={iconColor} />;
    case 'KALI_TEXTFILE':
      return <TextFileIcon size={size} color={iconColor} />;
    default:
      return null;
  }
};

/**
 *Renders desktop button with icon and text.
 *Supports both image-based and SVG Kali icon rendering.
 *@function DesktopIconButton
 */
const DesktopIconButton = ({
  variant,
  willOpenWindowWith,
  text,
  iconSize,
  iconSrc,
  details,
  action,
  isSelected,
  onSelect,
  ...rest
}: Props): JSX.Element => {
  const buttonRef = useRef(null);
  const { openWindow } = useActions();
  const { iconsSize } = useTypedSelector((state) => state.ui);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isFileManagerWindow = useCallback((): boolean => {
    if (iconSrc === 'KALI_FILEMANAGER' || iconSrc === 'KALI_FOLDER')
      return true;
    if (
      iconSrc.includes('user-folder') ||
      iconSrc.includes('recycle-bin') ||
      iconSrc.includes('this_pc')
    ) {
      return true;
    }
    if (React.isValidElement(willOpenWindowWith)) {
      const elementType = willOpenWindowWith.type as
        | { name?: string; displayName?: string }
        | string;
      if (typeof elementType !== 'string') {
        const compName = elementType.displayName || elementType.name || '';
        return compName === 'FileManager';
      }
    }
    return false;
  }, [iconSrc, willOpenWindowWith]);

  const handleOpenWindow = useCallback(() => {
    const normalizedWindowName = isFileManagerWindow() ? 'File Manager' : text;
    openWindow({
      windowName: normalizedWindowName,
      isOpen: true,
      windowIcon: iconSrc,
      size: {
        width: 0.7 * window.innerWidth,
        height: 0.65 * window.innerHeight,
      },
      windowContent: willOpenWindowWith,
    });
  }, [openWindow, iconSrc, text, willOpenWindowWith, isFileManagerWindow]);

  const handleOpenContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsContextMenuOpen((p) => !p);
    e.stopPropagation();
    e.preventDefault();
  };

  useCloseModalIfClickedOutside({
    isModalOpen: isContextMenuOpen,
    closeModalFunction: () => setIsContextMenuOpen(false),
    modalRef: buttonRef,
  });

  const kaliIcon = getKaliIcon(iconSrc, iconSize.width);

  const clickAction = action !== null ? action : handleOpenWindow;

  return (
    <Styled.Wrapper>
      <Styled.ButtonContainer
        ref={buttonRef}
        onClick={(e) => {
          if (variant !== 'desktop' && clickAction) clickAction();
          if (variant === 'desktop' && onSelect) onSelect(e);
        }}
        onDoubleClick={variant === 'desktop' ? clickAction : undefined}
        onContextMenu={handleOpenContextMenu}
        iconSize={iconsSize}
        variant={variant}
        isSelected={isSelected}
        {...rest}
      >
        <Styled.Figure>
          <div>
            {kaliIcon ? (
              kaliIcon
            ) : (
              <>
                {!isImageLoaded && (
                  <Styled.IconSpinner
                    style={{
                      width: `${iconSize.width}px`,
                      height: `${iconSize.height}px`,
                    }}
                  />
                )}
                <Image
                  src={iconSrc}
                  alt={text}
                  height={iconSize.height}
                  width={iconSize.width}
                  quality={100}
                  loading={variant === 'desktop' ? 'lazy' : 'eager'}
                  onLoadingComplete={() => setIsImageLoaded(true)}
                  style={{
                    objectFit: 'contain',
                    opacity: isImageLoaded ? 1 : 0,
                    transition: 'opacity 160ms ease',
                  }}
                />
              </>
            )}
          </div>
          {['pinnedApp', 'desktop'].includes(variant) && (
            <Styled.Figcaption>
              <Paragraph margin={'0rem'}>{text}</Paragraph>
            </Styled.Figcaption>
          )}

          {variant === 'recommendedApp' && (
            <Styled.RecommendedAppDescription>
              <Styled.FileName>{text}</Styled.FileName>
              <Paragraph margin={'0rem'}>{details}</Paragraph>
            </Styled.RecommendedAppDescription>
          )}
        </Styled.Figure>
      </Styled.ButtonContainer>

      {variant === 'desktop' && isContextMenuOpen && (
        <AppContextMenu
          appName={text}
          iconSrc={iconSrc}
          willOpenWindowWith={willOpenWindowWith}
        />
      )}
    </Styled.Wrapper>
  );
};
export default DesktopIconButton;
