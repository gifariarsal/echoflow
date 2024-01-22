import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, IconButton, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoAddOutline } from 'react-icons/io5';
import { asyncPopulateUsersAndThreads } from '../redux/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../redux/threads/action';
import useInput from '../hooks/useInput';
import ThreadCategoryList from '../components/ThreadCategoryList';
// import ThreadList from '../components/ThreadList';

function HomePage({ authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [category, onCategoryChange] = useInput('');

  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(asyncToggleUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncToggleDownVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const threadCategory = threadList.filter(
    (thread) => thread.category === category
  );

  const addThread = () => {
    navigate('/add-thread');
  };

  return (
    <Box pos="relative" w="full" minH="100vh" bg="bg.primary" p={4}>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="bg.secondary"
        minH="100vh"
        rounded="xl"
      >
        <header>
          <Text fontWeight="medium" mb={1}>
            Category
          </Text>
          <ThreadCategoryList onCategoryChange={onCategoryChange} />
        </header>
        <Heading as="h2" size="lg" mb={4}>
          Explore Threads
        </Heading>
      </Box>
      {authUser && (
        <IconButton
          pos="fixed"
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

const userShape = {
  id: PropTypes.string.isRequired,
};

HomePage.propTypes = {
  authUser: PropTypes.shape(userShape),
};

HomePage.defaultProps = {
  authUser: null,
};

export default HomePage;
