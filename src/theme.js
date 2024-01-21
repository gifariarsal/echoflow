import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      main: '#37630A',
      hover: '#457811',
      active: '#2D5406',
    },
    bg: {
      primary: '#F0F0F0',
      secondary: '#fcfcfc',
    },
  },
  fonts: {
    heading: "'Open Sans Variable', sans-serif",
    body: "'Open Sans Variable', sans-serif",
  },
});

export default theme;
