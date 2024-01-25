import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadCommentItem({
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
}) {
  return (
    <Box as="section">
      <Text
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Text display="flex" alignItems="center" gap={2}>
          <Avatar src={owner.avatar} name={owner.name} size="xs" />
          <Text fontWeight="bold">
            {owner.name}
          </Text>
        </Text>
        <Text as="time" dateTime={createdAt}>
          {postedAt(createdAt)}
        </Text>
      </Text>
      <Text>{parse(content)}</Text>
    </Box>
  );
}

export default ThreadCommentItem;
