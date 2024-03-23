import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import CTAButton from './CTAButton';

function NotFound({ navigate }) {
  return (
    <Box
      w="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Image src="/404.png" alt="404" w={{ base: '300px', md: '40%' }} />
      <Text align="center">Oops! Looks like you&apos;re on a missing page</Text>
      <CTAButton action="Go Back" onClick={() => navigate(-1)} width="300px" />
    </Box>
  );
}

NotFound.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default NotFound;
