import {
  Box, Heading, Text, Textarea
} from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CTAButton from './CTAButton';
import ThreadCommentItem from './ThreadCommentItem';

function ThreadComment({
  threadDetail,
  authUser,
  onAddComment,
  onUpVoteComment,
  onDownVoteComment,
}) {
  const MAX_CONTENT_LENGTH = 300;
  const [content, setContent] = React.useState('');
  const { comments } = threadDetail;

  const handleCommentChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= MAX_CONTENT_LENGTH) {
      setContent(inputValue);
    }
  };

  const handleAddComment = () => {
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    } else {
      alert('Please enter a comment');
    }
  };

  return (
    <>
      <Heading as="h3" fontSize="lg" mt={6} mb={4}>
        Leave a comment
      </Heading>
      {authUser ? (
        <Box>
          <Textarea
            minH="150px"
            value={content}
            onChange={handleCommentChange}
          />
          <Text textAlign="right" color="gray">
            {content.length}
            /
            {MAX_CONTENT_LENGTH}
          </Text>
          <CTAButton action="Add Comment" onClick={handleAddComment} />
        </Box>
      ) : (
        <Box display="flex" alignItems="center" gap={1}>
          Please
          {' '}
          <Link to="/login">
            <Text color="brand.main" _hover={{ textDecoration: 'underline' }}>
              login
            </Text>
          </Link>
          {' '}
          to leave a comment
        </Box>
      )}
      <Box>
        <Heading as="h3" fontSize="lg" mt={10} mb={6}>
          {`Comments (${comments.length})`}
        </Heading>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <ThreadCommentItem
              key={comment.id}
              {...comment}
              onUpVoteComment={onUpVoteComment}
              onDownVoteComment={onDownVoteComment}
            />
          ))
        ) : (
          <Text>No comments yet. Be the first!</Text>
        )}
      </Box>
    </>
  );
}

const userCommentShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.shape(userCommentShape),
  upVotesCommentBy: PropTypes.arrayOf(PropTypes.string),
  downVotesCommentBy: PropTypes.arrayOf(PropTypes.string),
};

const detailThreadShape = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.shape(userCommentShape),
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)),
};

ThreadComment.propTypes = {
  threadDetail: PropTypes.shape(detailThreadShape).isRequired,
  authUser: PropTypes.shape(userCommentShape),
  onAddComment: PropTypes.func.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
};

ThreadComment.defaultProps = {
  authUser: null,
};

export default ThreadComment;
