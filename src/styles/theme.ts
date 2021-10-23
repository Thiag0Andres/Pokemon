const defaultColors = {
  green: '#4CD964',
  green_light: '#26DEA8',
  red: '#EF4040',
  pokered: ' #dc0a2d',
  purple: '#6F5A9A',
  purple_light: ' #8E2DE2',
  purple_dark: '#3E3F68',
  blue: '#5157bb',
  blue_dark: '#152F4F',
  body: '#f8f8f9',
  blue_project: ' #2C5A92',
  grey: '#777',
  background: '#f8f9fa',
  white: '#fff',
  light_grey: '#d6d6d6',
  dark_grey: '#ffffff1a',
  transparent: 'transparent',
};

const theme = {
  colors: defaultColors,
} as const;

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;
