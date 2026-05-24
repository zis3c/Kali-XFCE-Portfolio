import 'styled-components';
import { IPrimaryColors, IGrayColors, IUtilityColors, IGradients, IBoxShadows, IFontSizes, IFontWeights, IMediaBreakpoints, ISpacing, IZindexes, IPortfolioStyle, IKaliTokens } from '../design-system/system-design-variables';

/**
 * Augment the styled-components DefaultTheme interface
 * so all theme prop accesses are type-safe.
 */
declare module 'styled-components' {
  export interface DefaultTheme {
    mode: 'dark' | 'light';
    primary: IPrimaryColors;
    gray: IGrayColors;
    colors: IUtilityColors;
    gradients: IGradients;
    boxShadow: IBoxShadows;
    borderRadius: string;
    zIndex: IZindexes;
    fontSize: IFontSizes;
    fontWeight: IFontWeights;
    space: ISpacing;
    media: IMediaBreakpoints;
    portfolio: IPortfolioStyle;
    kali: IKaliTokens;
  }
}
