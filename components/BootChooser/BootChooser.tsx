import React from 'react';
import * as Styled from './BootChooser.styles';

interface Props {
  bootHint: string;
  selectedBootIndex: number;
  onSelectBootIndex: (index: number) => void;
  onLaunchPortfolio: () => void;
  onLaunchKali: () => void;
}

/**
 * Phoenix SecureCore Tiano / BIOS-style boot menu chooser.
 * Renders a faux-UEFI interface with boot log lines and two
 * selectable boot targets.
 */
const BootChooser = ({
  bootHint,
  selectedBootIndex,
  onSelectBootIndex,
  onLaunchPortfolio,
  onLaunchKali,
}: Props): JSX.Element => {
  return (
    <Styled.Wrapper>
      <Styled.Viewport>
        <Styled.Header>Phoenix SecureCore Tiano Setup</Styled.Header>
        <Styled.Subheader>
          CPU: Intel(R) Core(TM) i7-10750H 2.60GHz | Memory Test: 8192MB OK
        </Styled.Subheader>
        <Styled.Log>[ OK ] SATA Controller initialized</Styled.Log>
        <Styled.Log>[ OK ] NVMe Controller initialized</Styled.Log>
        <Styled.Log>[ OK ] USB Controllers initialized</Styled.Log>
        <Styled.Log>[ OK ] Detecting bootable devices...</Styled.Log>
        <Styled.Title>Boot Menu</Styled.Title>
        <Styled.Subtitle>
          Use Up/Down to select boot target, then press Enter.
        </Styled.Subtitle>
        <Styled.Actions>
          <Styled.Button
            isActive={selectedBootIndex === 0}
            onClick={() => {
              onSelectBootIndex(0);
              onLaunchPortfolio();
            }}
          >
            Portfolio Mode (default)
          </Styled.Button>
          <Styled.Button
            isActive={selectedBootIndex === 1}
            onClick={() => {
              onSelectBootIndex(1);
              onLaunchKali();
            }}
          >
            Kali Linux XFCE Mode
          </Styled.Button>
        </Styled.Actions>
      </Styled.Viewport>
      <Styled.Bottom>
        <Styled.Footer>{bootHint}</Styled.Footer>
        <Styled.Footer>
          F2 = Setup | F8 = Advanced Boot Options | Enter = Continue
        </Styled.Footer>
      </Styled.Bottom>
    </Styled.Wrapper>
  );
};

export default BootChooser;
