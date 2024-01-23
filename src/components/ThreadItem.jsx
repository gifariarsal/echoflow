import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Box } from '@chakra-ui/react';
import ThreadItemHeader from './ThreadItemHeader';
import ThreadItemFooter from './ThreadItemFooter';

function ThreadItem({
  id,
  body,
  title,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
  onUpVoteThread,
  onDownVoteThread,
  isLastItem,
}) {
  return (
    <Box
      mb={8}
      borderBottom={isLastItem ? '0' : '1px solid'}
      borderColor="silver"
    >
      <ThreadItemHeader
        {...{
          id,
          category,
          title,
          user,
          createdAt,
        }}
      />
      <Box noOfLines={4} mb={4}>
        {parse(body)}
      </Box>
      <ThreadItemFooter
        {...{
          id,
          totalComments,
          upVotesBy,
          downVotesBy,
          onUpVoteThread,
          onDownVoteThread,
        }}
      />
    </Box>
  );
}

const userShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  avatar: PropTypes.string,
  email: PropTypes.string,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onUpVoteThread: PropTypes.func,
  onDownVoteThread: PropTypes.func,
};

ThreadItem.defaultProps = {
  onUpVoteThread: null,
  onDownVoteThread: null,
};

export { threadItemShape };

export default ThreadItem;
