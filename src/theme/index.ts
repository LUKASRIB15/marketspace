import { extendTheme } from "native-base";

export const THEME = extendTheme({
  colors: {
    gray: {
      100: "#F7F7F8",
      200: "#EDECEE",
      300: "#D9D8DA",
      500: "#9F9BA1",
      700: "#5F5B62",
      800: "#3E3A40",
      900: "#1A181B"
    },
    blue: {
      500: "#647AC7",
      700: "#364D9D"
    },
    red: {
      500: "#EE7979"
    }
  },
  fontSizes: {
    xs: 12,
    base: 14,
    md: 16,
    lg: 20,
    xl: 24
  },
  fonts:{
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular'
  }
})