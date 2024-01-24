import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiCommentDetail,
} from 'react-icons/bi';
import parse from 'html-react-parser';
import { Avatar, Box, Heading, Text } from '@chakra-ui/react';
import { postedAt } from '../utils';
import ThreadItemFooterButton from './ThreadItemFooterButton';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  comments,
  authUser,
  onAddComment,
  onUpVoteThreadDetail,
  onDownVoteThreadDetail,
}) {
  const hasVotedUp = upVotesBy.includes(authUser);
  const hasVotedDown = downVotesBy.includes(authUser);

  const onClickUpVote = (event) => {
    event.stopPropagation();
    if (!hasVotedUp && !hasVotedDown) {
      onUpVoteThread(id);
    } else if (hasVotedDown) {
      onNeutralizeDownVoteThread(id);
      onUpVoteThread(id);
    } else if (hasVotedUp) {
      onNeutralizeUpVoteThread(id);
    }
  };

  const onClickDownVote = (event) => {
    event.stopPropagation();
    if (!hasVotedUp && !hasVotedDown) {
      onDownVoteThread(id);
    } else if (hasVotedUp) {
      onNeutralizeUpVoteThread(id);
      onDownVoteThread(id);
    } else if (hasVotedDown) {
      onNeutralizeDownVoteThread(id);
    }
  };
  return (
    <Box as="section">
      <header>
        <Text color="brand.main" mb={2}>{`#${category}`}</Text>
      </header>
      <Box>
        <Heading as="h2">{title}</Heading>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          fontSize="sm"
          color="gray"
          mt={4}
          mb={8}
        >
          <Avatar name={owner.name} src={owner.avatar} size="xs" />
          <Text as="strong" fontWeight="bold">
            {owner.name}
          </Text>
          {' • '}
          <Text as="time" dateTime={createdAt}>
            {postedAt(createdAt)}
          </Text>
        </Box>
      </Box>
      <Box pb={4} borderBottom="1px solid" borderColor="silver">
        {parse(body)}
      </Box>
      <footer>
        <Box display="flex" alignItems="center" gap={4} my={2}>
          <ThreadItemFooterButton
            icon={hasVotedUp ? <BiSolidUpvote color="green" /> : <BiUpvote />}
            value={upVotesBy.length}
            onClick={
              authUser ? onClickUpVote : () => alert('Please login to upvote')
            }
          />
          <ThreadItemFooterButton
            icon={
              hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />
            }
            value={downVotesBy.length}
            onClick={
              authUser
                ? onClickDownVote
                : () => alert('Please login to downvote')
            }
          />
        </Box>
      </footer>
    </Box>
  );
}

export default ThreadDetail;
