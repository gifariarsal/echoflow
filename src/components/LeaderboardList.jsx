import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardItem, { leaderboardItemShape } from './LeaderboardItem';

function LeaderboardList({ leaderboards }) {
  return (
    <Box minH="100vh">
      <header>
        <Box display="flex" justifyContent="space-between" mb={4}>
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'xl' }}>
            User
          </Text>
          <Text fontWeight="bold" fontSize={{ base: 'md', md: 'xl' }}>
            Score
          </Text>
        </Box>
      </header>
      {leaderboards.map((leaderboard) => (
        <LeaderboardItem key={leaderboard.id} {...leaderboard} />
      ))}
    </Box>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.shape(leaderboardItemShape))
    .isRequired,
};

export default LeaderboardList;
