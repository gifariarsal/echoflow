import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function Layout({ children }) {
  return (
    <Box
      pos="relative"
      w="full"
      minH="calc(100vh - 60px)"
      bg="bg.primary"
      p={4}
    >
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="bg.secondary"
        minH="calc(100vh - 60px - 32px)"
        rounded="xl"
      >
        {children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
