import React, { useEffect, useState } from 'react';
import {
  Box, Heading, IconButton, Text
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import { asyncPopulateUsersAndThreads } from '../redux/shared/action';
import ThreadCategoryList from '../components/thread/ThreadCategoryList';
import ThreadList from '../components/thread/ThreadList';

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, onCategoryChange] = useState('');

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  const threadCategory = category === ''
    ? threadList
    : threadList.filter((thread) => thread.category === category);

  const addThread = () => {
    navigate('/add-thread');
  };

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
        <header>
          <Text fontWeight="semibold" mb={1}>
            Category
          </Text>
          <ThreadCategoryList onCategoryChange={onCategoryChange} />
        </header>
        <Heading as="h2" size="lg" mb={8} mt={4}>
          Explore Threads
        </Heading>
        <ThreadList threads={category ? threadCategory : threadList} />
      </Box>
      {authUser && (
        <IconButton
          pos="fixed"
          title="Add Thread"
          bottom={8}
          right={8}
          onClick={addThread}
          zIndex={10}
          icon={<IoAddOutline size={32} />}
          size="lg"
          rounded="full"
          color="white"
          bg="brand.main"
          _hover={{ bg: 'brand.hover' }}
          _active={{ bg: 'brand.active' }}
        />
      )}
    </Box>
  );
}

export default HomePage;
