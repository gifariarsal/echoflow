import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiCommentDetail,
} from 'react-icons/bi';
import { Text } from '@chakra-ui/react';

function ThreadItemFooter({
  id,
  totalComments,
  upVotesBy,
  downVotesBy,
  onUpVoteThread,
  onDownVoteThread,
}) {
  const hasVotedUp = upVotesBy.includes(id);
  const hasVotedDown = downVotesBy.includes(id);
  return (
    <footer>
      <Text display="flex" alignItems="center" gap={1} mb={4}>
        <BiCommentDetail />
        {totalComments}
      </Text>
    </footer>
  );
}

ThreadItemFooter.propTypes = {
  id: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  onUpVoteThread: PropTypes.func.isRequired,
  onDownVoteThread: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadItemFooter;
