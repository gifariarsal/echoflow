import { Box, Heading, Text, Textarea } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import CTAButton from './CTAButton';
import ThreadCommentItem from './ThreadCommentItem';

function ThreadComment({ comments, onAddComment, onUpVoteComment, onDownVoteComment }) {
  const MAX_CONTENT_LENGTH = 300;

  const [content, setContent] = React.useState('');

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
      <Box>
        <Heading as="h3" fontSize="lg" mt={6} mb={4}>
          Leave a comment
        </Heading>
        <Textarea minH="150px" value={content} onChange={handleCommentChange} />
        <Text textAlign="right" color="gray">
          {content.length}/{MAX_CONTENT_LENGTH}
        </Text>
        <CTAButton action="Add Comment" onClick={handleAddComment} />
      </Box>
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

ThreadComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddComment: PropTypes.func.isRequired,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
};

export default ThreadComment;
