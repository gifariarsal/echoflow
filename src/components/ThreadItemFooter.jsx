import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiCommentDetail,
} from 'react-icons/bi';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ThreadItemFooterButton from './ThreadItemFooterButton';
import {
  asyncToggleDownVoteThread,
  asyncToggleNeutralDownVoteThread,
  asyncToggleNeutralUpVoteThread,
  asyncToggleUpVoteThread,
} from '../redux/threads/action';

function ThreadItemFooter({
  id,
  totalComments,
  upVotesBy,
  downVotesBy,
  authUser,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasVotedUp = upVotesBy.includes(authUser);
  const hasVotedDown = downVotesBy.includes(authUser);

  const onUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const onDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  const onNeutralizeUpVoteThread = (threadId) => {
    dispatch(asyncToggleNeutralUpVoteThread(threadId));
  };

  const onNeutralizeDownVoteThread = (threadId) => {
    dispatch(asyncToggleNeutralDownVoteThread(threadId));
  };

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
        <ThreadItemFooterButton
          icon={hasVotedUp ? <BiSolidUpvote color="green" /> : <BiUpvote />}
          title="Upvote"
          value={upVotesBy.length}
          onClick={
            authUser ? onClickUpVote : () => alert('Please login to upvote')
          }
        />
        <ThreadItemFooterButton
          icon={hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />}
          title="Downvote"
          value={downVotesBy.length}
          onClick={
            authUser ? onClickDownVote : () => alert('Please login to downvote')
          }
        />
        <ThreadItemFooterButton
          icon={<BiCommentDetail />}
          title="Comments"
          value={totalComments}
          onClick={onClickComments}
        />
      </Box>
    </footer>
  );
}

ThreadItemFooter.propTypes = {
  id: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
};

ThreadItemFooter.defaultProps = {
  authUser: null,
};

export default ThreadItemFooter;
