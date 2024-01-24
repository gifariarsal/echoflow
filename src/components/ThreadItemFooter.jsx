import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiCommentDetail,
} from 'react-icons/bi';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import ThreadItemFooterButton from './ThreadItemFooterButton';

function ThreadItemFooter({
  id,
  totalComments,
  upVotesBy,
  downVotesBy,
  onUpVoteThread,
  onDownVoteThread,
  onNeutralizeUpVoteThread,
  onNeutralizeDownVoteThread,
  authUser,
}) {
  const navigate = useNavigate();
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

  const onClickComments = () => {
    navigate(`/threads/${id}`);
  };

  return (
    <footer>
      <Box display="flex" alignItems="center" gap={4} mb={2}>
        <Button
          type="button"
          variant="ghost"
          rounded="full"
          fontWeight="normal"
          p={1}
          onClick={
            authUser ? onClickUpVote : () => alert('Please login to upvote')
          }
        >
          <Text display="flex" alignItems="center" gap={1}>
            {hasVotedUp ? <BiSolidUpvote color="green" /> : <BiUpvote />}
            {upVotesBy.length}
          </Text>
        </Button>
        <Button
          type="button"
          variant="ghost"
          rounded="full"
          fontWeight="normal"
          p={1}
          onClick={
            authUser ? onClickDownVote : () => alert('Please login to upvote')
          }
        >
          <Text display="flex" alignItems="center" gap={1}>
            {hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />}
            {downVotesBy.length}
          </Text>
        </Button>
        <Button
          type="button"
          variant="ghost"
          rounded="full"
          fontWeight="normal"
          p={1}
          onClick={onClickComments}
        >
          <Text display="flex" alignItems="center" gap={1}>
            <BiCommentDetail />
            {totalComments}
          </Text>
        </Button>
        {/* <ThreadItemFooterButton
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
            authUser ? onClickDownVote : () => alert('Please login to upvote')
          }
        />
        <ThreadItemFooterButton
          icon={<BiCommentDetail />}
          value={totalComments}
          onClick={onClickComments}
        /> */}
      </Box>
    </footer>
  );
}

ThreadItemFooter.propTypes = {
  id: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpVoteThread: PropTypes.func.isRequired,
  onDownVoteThread: PropTypes.func.isRequired,
  onNeutralizeUpVoteThread: PropTypes.func.isRequired,
  onNeutralizeDownVoteThread: PropTypes.func.isRequired,
};

export default ThreadItemFooter;
