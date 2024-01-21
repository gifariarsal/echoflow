import { Box } from '@chakra-ui/react';
import React from 'react';

function LoginPage() {
  return (
    <Box w="full" minH="100vh" bg="bg.primary" p={2}>
      <Box w="full" h="full" rounded="xl" bg="bg.secondary" display="flex">
        <Box
          w="40%"
          display="flex"
          rounded="xl"
          justifyContent="center"
          alignItems="center"
        >
          Testnya mana
          {/* <Image /> */}
        </Box>
        <Box w="60%">tes lagi</Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
