import { Box } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function AuthLayout({ children }) {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="calc(100vh - 60px)"
      bg="bg.primary"
      p={4}
    >
      <Box
        w="full"
        minH={{ md: 'calc(100vh - 60px - 32px)' }}
        rounded="xl"
        bg="bg.secondary"
        display="flex"
      >
        {children}
      </Box>
    </Box>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
