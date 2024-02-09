import React, { useEffect, useState } from 'react';
import { Heading, IconButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import { asyncPopulateUsersAndThreads } from '../redux/shared/action';
import ThreadCategoryList from '../components/thread/ThreadCategoryList';
import ThreadList from '../components/thread/ThreadList';
import Layout from '../components/common/Layout';

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

  const threadCategory =
    category === ''
      ? threadList
      : threadList.filter((thread) => thread.category === category);

  const addThread = () => {
    navigate('/add-thread');
  };

  return (
    <>
      <Layout>
        <header>
          <Text fontWeight="semibold" mb={1}>
            Category
          </Text>
          <ThreadCategoryList onCategoryChange={onCategoryChange} />
        </header>
        <Heading
          as="h2"
          size="lg"
          mb={8}
          mt={2}
          pt={4}
          borderTop="1px solid"
          borderColor="gray.300"
        >
          Explore Threads
        </Heading>
        <ThreadList threads={category ? threadCategory : threadList} />
      </Layout>
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
    </>
  );
}

export default HomePage;
