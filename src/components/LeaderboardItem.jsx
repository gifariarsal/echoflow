import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { userShape } from '../utils/propShape';

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

LeaderboardItem.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
