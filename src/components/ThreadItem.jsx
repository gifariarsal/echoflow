import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
  BiCommentDetail,
} from 'react-icons/bi';
import { postedAt } from '../utils';

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
  const navigate = useNavigate();

  const onThreadDetail = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <Box
      mb={8}
      borderBottom={isLastItem ? '0' : '1px solid'}
      borderColor="silver"
    >
      <header>
        <Text color="brand.main" mb={2}>{`#${category}`}</Text>
        <Heading as="h4" fontSize="xl" mb={2}>
          {title}
        </Heading>
        <Text fontSize="sm" color="gray" mb={4}>
          {'by '}
          <Text as="strong" fontWeight="bold">
            {user.name}
          </Text>
          {' • '}
          <Text as="time" dateTime={createdAt}>
            {postedAt(createdAt)}
          </Text>
        </Text>
      </header>
      <Box noOfLines={4} mb={4}>
        {parse(body)}
      </Box>
      <footer>
        <Text display="flex" alignItems="center" gap={1} mb={4}>
          <BiCommentDetail />
          {totalComments}
        </Text>
      </footer>
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
