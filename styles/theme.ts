import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    primary: '#ffbf00',
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
    header: '#26282b',
    backgroud: '#1d1f21',
    tabBar: '#333335',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    paddingPage: 10,
    heightHeader: 50,
  }
});