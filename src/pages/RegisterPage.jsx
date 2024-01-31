import {
  Box, Button, Image, Text, VStack
} from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../redux/users/action';
import RegisterInput from '../components/auth/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/login');
  };
  return (
    <Box w="full" minH="calc(100vh - 60px)" bg="bg.primary" p={4}>
      <Box
        w="full"
        minH={{ md: 'calc(100vh - 60px - 32px)' }}
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
          <Image src="/register.png" alt="login" w={{ md: '80%', lg: '50%' }} />
        </Box>
        <Box w={{ base: 'full', md: '60%' }}>
          <Box
            display="flex"
            justifyContent="flex-end"
            gap={2}
            p={{ base: '10px 20px', md: '20px 40px' }}
          >
            <Text>Already have an account?</Text>
            <Button
              as="a"
              fontSize="md"
              fontWeight={400}
              variant="link"
              href="/login"
              color="brand.main"
            >
              Login
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
              Register
            </Text>
            <Box w="full">
              <RegisterInput onRegister={onRegister} />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}

export default RegisterPage;
