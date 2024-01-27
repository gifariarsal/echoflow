import {
  Box, Button, Image, Text, VStack
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../redux/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async ({ email, password }) => {
    await dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <Box w="full" minH="100vh" bg="bg.primary" p={4}>
      <Box
        w="full"
        minH={{ md: '100vh' }}
        rounded="xl"
        bg="bg.secondary"
        display="flex"
      >
        <Box
          w="40%"
          display={{ base: 'none', md: 'flex' }}
          rounded="xl"
          justifyContent="center"
          alignItems="center"
        >
          <Image src="/login.png" alt="login" w={{ md: '80%', lg: '50%' }} />
        </Box>
        <Box w={{ base: 'full', md: '60%' }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={2}
            p={{ base: '10px 20px', md: '20px 40px' }}
          >
            <Text>Don&apos;t have an account?</Text>
            <Button
              as="a"
              fontSize="md"
              fontWeight={400}
              variant="link"
              href="/register"
              color="brand.main"
            >
              Register
            </Button>
          </Box>
          <VStack
            spacing="4"
            py="20px"
            px={{ base: '40px', md: '60px', lg: '140px' }}
          >
            <Text
              w="100%"
              fontSize="xx-large"
              display="flex"
              justifyContent="flex-start"
              fontWeight="bold"
            >
              Login
            </Text>
            <Box w="full">
              <LoginInput onLogin={onLogin} />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;
