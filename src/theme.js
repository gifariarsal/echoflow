import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      main: '#CC246C',
      hover: '#EA4B8F',
      active: '#9C0C4A',
    },
    bg: {
      primary: '#F0F0F0',
      secondary: '#fcfcfc',
    },
    dark: '#1b1b1b',
  },
  fonts: {
    heading: "'Open Sans Variable', sans-serif",
    body: "'Open Sans Variable', sans-serif",
  },
});

export default theme;
