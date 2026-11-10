import React from 'react';
import * as Styled from './TrashBin.styles';
import DesktopButton from '../../DesktopButton/DesktopButton';
import { useDesktopApps } from '../../DesktopApps/DesktopApps.config';

/**
 *Renders inner content of trash bin, currently hard-coded
 *@function TrashBin
 *@returns {JSX.Element} - Rendered TrashBin component
 */
const TrashBin = (): JSX.Element => {
  const { appsInTrashBin } = useDesktopApps();
  return (
    <Styled.Container>
      {appsInTrashBin.map((deletedApp) => (
        <DesktopButton
          key={deletedApp.id}
          variant={'desktop'}
          willOpenWindowWith={deletedApp.willOpenWindowWith}
          iconSrc={deletedApp.iconSrc}
          iconSize={deletedApp.iconSize}
          text={deletedApp.text}
          action={null}
        />
      ))}
    </Styled.Container>
  );
};
export default TrashBin;
