import { DefaultTheme } from 'styled-components';
import { darkTheme, lightTheme } from './themes';

/**
 * Custom hook used to get app's themes used by styled component's theme provider to locally style all app's components
 * All particular values and styles are stored and exported from file "system-design-variables.ts"
 * Kali Linux Xfce theme - dark only
 * @function useSystemDesign
 * @returns {{darkTheme,lightTheme}} appThemes - the hook returns objects with specific css params, colors, spacings and all necessary info for styling the app using global Styled Components theme provider
 */

export const useSystemDesign = (): {
  darkTheme: DefaultTheme;
  lightTheme: DefaultTheme;
} => {
  return { darkTheme, lightTheme };
};

