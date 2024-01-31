import { Heading } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../redux/shared/action';
import LeaderboardList from '../components/leaderboards/LeaderboardList';
import Layout from '../components/common/Layout';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  return (
    <Layout>
      <Heading as="h2" size="lg" mb={8}>
        Most Active Users
      </Heading>
      <LeaderboardList leaderboards={leaderboards} />
    </Layout>
  );
}

export default LeaderboardsPage;
