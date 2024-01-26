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
import { commentShape, userShape } from '../utils/propShape';
import ThreadItemFooterButton from './ThreadItemFooterButton';

function ThreadCommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onUpVoteComment,
  onDownVoteComment,
  onNeutralizeUpVoteComment,
  onNeutralizeDownVoteComment,
  authUser,
  isLastItem,
}) {
  const hasVotedUp = upVotesBy.includes(authUser?.id);
  const hasVotedDown = downVotesBy.includes(authUser?.id);

  const onClickUpVote = (event) => {
    event.stopPropagation();
    if (!hasVotedUp && !hasVotedDown) {
      onUpVoteComment(id);
    } else if (hasVotedDown) {
      onNeutralizeDownVoteComment(id);
      onUpVoteComment(id);
    } else if (hasVotedUp) {
      onNeutralizeUpVoteComment(id);
    }
  };

  const onClickDownVote = (event) => {
    event.stopPropagation();
    if (!hasVotedUp && !hasVotedDown) {
      onDownVoteComment(id);
    } else if (hasVotedUp) {
      onNeutralizeUpVoteComment(id);
      onDownVoteComment(id);
    } else if (hasVotedDown) {
      onNeutralizeDownVoteComment(id);
    }
  };

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
          onClick={
            authUser ? onClickUpVote : () => alert('Please login to upvote')
          }
        />
        <ThreadItemFooterButton
          icon={hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />}
          value={downVotesBy.length}
          onClick={
            authUser ? onClickDownVote : () => alert('Please login to downvote')
          }
        />
      </Box>
    </Box>
  );
}

ThreadCommentItem.propTypes = {
  ...commentShape,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
  onNeutralizeUpVoteComment: PropTypes.func.isRequired,
  onNeutralizeDownVoteComment: PropTypes.func.isRequired,
  authUser: PropTypes.shape(userShape),
  isLastItem: PropTypes.bool,
};

ThreadCommentItem.defaultProps = {
  authUser: null,
  isLastItem: false,
};

export default ThreadCommentItem;
