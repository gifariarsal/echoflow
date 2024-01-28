import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncAddTread } from '../redux/threads/action';
import { AddThreadInput } from '../components';

function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddTread({ title, body, category }));
    navigate('/');
  };

  return (
    <Box w="full" minH="100vh" bg="bg.primary" p={4}>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="bg.secondary"
        minH="100vh"
        rounded="xl"
      >
        <Heading as="h2" size="lg" mb={4}>
          Add New Thread
        </Heading>
        <AddThreadInput addThread={onAddThread} />
      </Box>
    </Box>
  );
}

export default AddThreadPage;
