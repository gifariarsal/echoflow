import { Box, Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../redux/shared/action';
import LeaderboardList from '../components/LeaderboardList';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

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
        <Heading as="h2" size="lg" mb={8}>
          Most Active Users
        </Heading>
        <LeaderboardList leaderboards={leaderboards} />
      </Box>
    </Box>
  );
}

export default LeaderboardsPage;
