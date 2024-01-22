import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardItem({ user, score }) {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={4}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar src={user.avatar} name={user.name} size={{ base: 'sm', md: 'md' }} />
        <Text>{user.name}</Text>
      </Box>
      <Text>{score}</Text>
    </Box>
  );
}

const userLeaderboardItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const leaderboardItemShape = {
  user: PropTypes.shape(userLeaderboardItemShape).isRequired,
  score: PropTypes.number.isRequired,
};

LeaderboardItem.propTypes = {
  ...leaderboardItemShape,
};

export { leaderboardItemShape };

export default LeaderboardItem;
