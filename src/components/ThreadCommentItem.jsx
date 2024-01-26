import { Avatar, Box, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import parse from 'html-react-parser';
import { postedAt } from '../utils';
import ThreadItemFooterButton from './ThreadItemFooterButton';

function ThreadCommentItem({
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  isLastItem,
}) {
  const hasVotedUp = upVotesBy.includes(authUser);
  const hasVotedDown = downVotesBy.includes(authUser);
  return (
    <Box
      as="section"
      pt={4}
      pb={2}
      borderBottom={isLastItem ? '0' : '1px solid'}
      borderColor="silver"
    >
      <Text
        as="header"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={owner.avatar} name={owner.name} size="xs" />
          <Text fontWeight="bold">{owner.name}</Text>
        </Box>
        <Text as="time" dateTime={createdAt}>
          {postedAt(createdAt)}
        </Text>
      </Text>
      <Text>{parse(content)}</Text>
      <Box display="flex" alignItems="center" gap={4} mt={2}>
        <ThreadItemFooterButton
          icon={hasVotedUp ? <BiSolidUpvote color="green" /> : <BiUpvote />}
          value={upVotesBy.length}
          // onClick={
          //   authUser ? onClickUpVote : () => alert('Please login to upvote')
          // }
        />
        <ThreadItemFooterButton
          icon={hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />}
          value={downVotesBy.length}
          // onClick={
          //   authUser ? onClickDownVote : () => alert('Please login to downvote')
          // }
        />
      </Box>
    </Box>
  );
}

const ownerCommentItemShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadCommentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerCommentItemShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentItem.propTypes = {
  ...threadCommentItemShape,
  isLastItem: PropTypes.bool,
};

ThreadCommentItem.defaultProps = {
  isLastItem: false,
};

export { threadCommentItemShape };

export default ThreadCommentItem;
