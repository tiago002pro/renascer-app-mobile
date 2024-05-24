import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    // primary: '#F7FD04',
    primary: '#F9A601',
    primary2: '#ffbe0059',
    gray: {
      300: '#8D8D99',
      600: '#454545',
      700: '#626262'
    },
    blue: {
      300: '#5f6477',
      400: '#4a5374',
    },
    orangeNew: "#F0A500",
    while: "#fff",
    black: "#000",
    backgroudLight: "#f4f5f7",
    statusBar: '#3c3c3a',
    header: '#111111',
    backgroud: '#030303',
    tabBar: '#111111',
    second: '#666666',
    third: '#666666',
    font: '#e0e0e0',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    title: 24,
    subTitle: 20,
    text: 18,
    subText: 14,
  },
  sizes: {
    paddingPage: 12,
  }
});