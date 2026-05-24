/*=============================================
    CSS Values and variables used in App
    Kali Linux Xfce Theme
=============================================*/

/**
 *@EXPORTS
 */

export {
  darkPrimaryColors,
  lightPrimaryColors,
  darkGrayColors,
  lightGrayColors,
  darkUtilityColors,
  lightUtilityColors,
  fontSizes,
  allGradients,
  fontWeights,
  responsiveBreakPoints,
  spacing,
  borderRadii,
  boxShadows,
  zIndexes,
  portfolioStyles,
  kaliTokens,
};

/**
 * TABLE OF CONTENTS
 *
 * COLORS
 * Primary colors...................Main primary colors for Kali Xfce theme
 * Gray colors.................Gray palette
 * Utility Colors.................Component-specific colors
 *
 * KALI TOKENS
 * Panel tokens....................Xfce top panel
 * Terminal tokens.................xfce4-terminal
 * Whisker Menu tokens.............Application launcher
 * File Manager tokens.............Thunar-style file manager
 * Window tokens...................Xfwm4 window manager
 *
 * GRADIENTS
 * ..................Main gradients used in the app
 *
 * TYPOGRAPHY
 * Font weights...................Font weights
 * Sizes..........................Font sizing
 *
 * BREAKPOINTS
 * Media....................Responsive breakpoints
 *
 * SPACING
 * Spacing........................Fixed spacing variables
 *
 * OTHER STYLES
 * Border radius.......................Border radii
 * Box Shadows..........................Box shadows
 * Z-Indexes..........................Z-Indexes
 *
 * PORTFOLIO STYLES
 * Portfolio Styles.......................Portfolio slides design-system
 *
 */

/*=============================================
=                  Colors                     =
=============================================*/

const darkPrimaryColors = {
  background: '#1a1a2e',
  text: 'rgba(220, 230, 240, 0.92)',
};

export type IPrimaryColors = typeof darkPrimaryColors;

const darkGrayColors = {
  dark: 'rgba(40, 42, 54, 0.85)',
  light: '#2a2a3e',
  lightest: '#3a3a50',
};

export type IGrayColors = typeof darkGrayColors;

const darkUtilityColors = {
  appCenter: {
    bg: 'rgba(18, 18, 32, 0.97)',
    searchBarBg: 'rgba(30, 30, 50, 0.95)',
  },
  systemTray: { bg: 'rgba(16, 16, 28, 0.97)' },
  gray: {
    dark: 'rgba(40, 42, 54, 0.85)',
    light: '#2a2a3e',
    lightest: 'rgba(160, 170, 180, 0.7)',
    invisible: 'rgba(100, 110, 120, 0.1)',
  },
  red: { danger: 'rgba(255, 80, 80, 0.7)', lightDanger: '#e84040' },
  blue: {
    icon: '#63d0ff',
    border: '#367bf0',
    activeBlue: '#367bf0',
    brandColor: '#367bf0',
  },
  modals: { widgetModalBg: 'rgba(18, 18, 32, 0.95)' },
  cards: {
    widgetBg: 'rgba(22, 22, 38, 0.9)',
  },
  windows: {
    bg: 'rgba(20, 20, 36, 0.97)',
    navBg: '#1e1e32',
  },

  buttons: {
    simpleButtonBg: 'rgba(40, 50, 70, 0.7)',
    settingsButton: {
      bg: 'rgba(255, 255, 255, 0.05)',
      activeBg: '#367bf0',
      activeColor: '#ffffff',
    },
    desktopButton: {
      hover: 'rgba(54, 123, 240, 0.18)',
      systemTrayHover: 'rgba(54, 123, 240, 0.25)',
      pinnedAppHover: 'rgba(54, 123, 240, 0.18)',
    },
  },
};

export type IUtilityColors = typeof darkUtilityColors;

// Kali is intentionally dark-only. Both themes point to the same dark palette
// because the Kali XFCE simulation has no light mode.
// The light theme exports exist to satisfy the ThemeProvider interface shape.
const lightPrimaryColors: IPrimaryColors = darkPrimaryColors;
const lightGrayColors: IGrayColors = darkGrayColors;
const lightUtilityColors: IUtilityColors = { ...darkUtilityColors };

/*=====  End of Colors  ======*/

/*=============================================
=              Kali/Xfce Tokens               =
=============================================*/

const kaliTokens = {
  panel: {
    bg: '#0e0e1a',
    height: '36px',
    border: '1px solid rgba(54, 123, 240, 0.15)',
    textColor: 'rgba(200, 210, 220, 0.9)',
    hoverBg: 'rgba(54, 123, 240, 0.2)',
    activeBg: 'rgba(54, 123, 240, 0.35)',
    separatorColor: 'rgba(100, 120, 140, 0.2)',
  },
  terminal: {
    bg: '#0d0d17',
    text: '#63d0ff',
    promptUser: '#5fff5f',
    promptAt: '#63d0ff',
    promptHost: '#5fff5f',
    promptPath: '#367bf0',
    promptSymbol: '#ffffff',
    commandText: '#e0e0e0',
    outputText: 'rgba(200, 210, 220, 0.85)',
    errorText: '#e84040',
    cursorColor: '#63d0ff',
    selectionBg: 'rgba(54, 123, 240, 0.3)',
    scrollbarThumb: 'rgba(54, 123, 240, 0.4)',
  },
  whiskerMenu: {
    bg: '#101020',
    categoryBg: '#0c0c18',
    categoryHover: 'rgba(54, 123, 240, 0.2)',
    categoryActive: 'rgba(54, 123, 240, 0.35)',
    appHover: 'rgba(54, 123, 240, 0.15)',
    searchBg: '#1a1a30',
    searchBorder: 'rgba(54, 123, 240, 0.3)',
    searchFocusBorder: '#367bf0',
    separatorColor: 'rgba(100, 120, 140, 0.15)',
    textPrimary: 'rgba(220, 230, 240, 0.92)',
    textSecondary: 'rgba(160, 170, 180, 0.7)',
  },
  fileManager: {
    sidebarBg: '#0e0e1a',
    toolbarBg: '#141428',
    contentBg: '#16162a',
    sidebarHover: 'rgba(54, 123, 240, 0.15)',
    sidebarActive: 'rgba(54, 123, 240, 0.25)',
    fileHover: 'rgba(54, 123, 240, 0.12)',
    fileSelected: 'rgba(54, 123, 240, 0.25)',
    pathBg: '#1a1a30',
    borderColor: 'rgba(100, 120, 140, 0.15)',
  },
  xfceWindow: {
    titleBarBg: '#1e1e32',
    titleBarText: 'rgba(200, 210, 220, 0.9)',
    activeBorder: 'rgba(54, 123, 240, 0.5)',
    inactiveBorder: 'rgba(60, 60, 80, 0.4)',
    contentBg: '#16162a',
    buttonHover: 'rgba(255, 255, 255, 0.08)',
    closeHover: '#e84040',
    minimizeHover: 'rgba(54, 123, 240, 0.3)',
    maximizeHover: 'rgba(54, 123, 240, 0.3)',
    borderRadius: '2px',
    borderWidth: '1px',
  },
  desktop: {
    iconTextShadow: '0 1px 3px rgba(0, 0, 0, 0.8)',
    iconHoverBg: 'rgba(54, 123, 240, 0.15)',
    iconSelectedBg: 'rgba(54, 123, 240, 0.3)',
  },
};

export type IKaliTokens = typeof kaliTokens;

/*=====  End of Kali Tokens  ======*/

/*=============================================
=                  Gradients                  =
=============================================*/
const allGradients = {
  portfolioGreen: `linear-gradient(
      45deg,
      #01bf71 0%,
      #2bd2ff 52%,
      #2bff88 90%
    );`,
  rainbow: `linear-gradient(
      45deg,
      #ff0000,
      #ff7300,
      #fffb00,
      #48ff00,
      #00ffd5,
      #002bff,
      #7a00ff,
      #ff00c8,
      #ff0000
    );`,
  lightGrayGradient: `radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(30, 30, 50, 1) 0%,
    rgba(14, 14, 26, 1) 81.3%
  )`,
  kaliDesktop: `radial-gradient(
    ellipse at 50% 50%,
    rgba(20, 30, 60, 0.4) 0%,
    rgba(14, 14, 26, 0) 70%
  )`,
};

export type IGradients = typeof allGradients;

/*=============================================
=                Typography                   =
=============================================*/

/* Font sizes */

const fontSizes = { large: '14px', medium: '12px', small: '11px' };

export type IFontSizes = typeof fontSizes;

/* Font weights */

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
};

export type IFontWeights = typeof fontWeights;

/*=====  End of Typography  ======*/

/*=============================================
=            Breakpoints                      =
=============================================*/

const responsiveBreakPoints = {
  phone: '(max-width: 500px)',
  tablet: '(max-width: 768px)',
  desktop: '(min-width: 800px)',
};

export type IMediaBreakpoints = typeof responsiveBreakPoints;

/*=====  End of Breakpoints  ======*/

/*=============================================
=            Spacing                          =
=============================================*/

const spacing = {
  none: '0rem',
  xxxs: '0.25rem',
  xxs: '0.5rem',
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '5rem',
};

export type ISpacing = typeof spacing;

/*=====  End of Spacing  ======*/

/*=============================================
=            Other Styles                     =
=============================================*/

/* Border radius */
const borderRadii = { main: '2px' };

/* Box Shadows */
const boxShadows = {
  appBtn: '0 1px 2px rgba(0, 0, 0, 0.3)',
  window:
    '0 2px 8px rgba(0, 0, 0, 0.4), 0 0 1px rgba(54, 123, 240, 0.2)',
};

export type IBoxShadows = typeof boxShadows;

/* Z-indexes */
const zIndexes = {
  highestPriority: 777,
  navigation: 78,
  modal: 77,
  lowPriority: 7,
};

export type IZindexes = typeof zIndexes;

/*=====  End of Other Styles  ======*/

/*=============================================
=            Portfolio Styles                 =
=============================================*/

const portfolioStyles = {
  bgColor: '#0d0d17',
  secondaryBg: { purple: '#367bf0' },
  primaryColor: { dark: '#63d0ff', light: '#5fff5f' },
  text: { light: 'rgba(220, 230, 240, 0.95)', dark: '#0d0d17' },
  resumeColors: {
    accentColor: '#367bf0',
    darkText: '#0d0d17',
    bgColor: '#16162a',
    lightText: 'rgba(160, 170, 180, 0.85)',
  },
};

export type IPortfolioStyle = typeof portfolioStyles;
