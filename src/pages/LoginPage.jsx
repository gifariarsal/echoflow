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

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <Box w="full" minH="100vh" bg="bg.primary" p={4}>
      <Box w="full" minH="100vh" rounded="xl" bg="bg.secondary" display="flex">
        <Box
          w="40%"
          display="flex"
          rounded="xl"
          justifyContent="center"
          alignItems="center"
        >
          <Image src="/login.png" alt="login" w="50%" />
        </Box>
        <Box w="60%">
          <Box display="flex" justifyContent="flex-end" gap={2} p="20px 40px">
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
          <VStack spacing="4" p="20px 200px">
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
