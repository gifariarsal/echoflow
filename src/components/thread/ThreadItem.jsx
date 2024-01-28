import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { Box } from '@chakra-ui/react';
import ThreadItemHeader from './ThreadItemHeader';
import ThreadItemFooter from './ThreadItemFooter';
import { userShape, detailThreadShape } from '../../utils/propShape';

function ThreadItem({
  id,
  body,
  title,
  category,
  createdAt,
  user,
  authUser,
  upVotesBy,
  downVotesBy,
  totalComments,
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
          authUser,
        }}
      />
    </Box>
  );
}

const threadItemShape = {
  ...detailThreadShape,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  isLastItem: PropTypes.bool,
};

ThreadItem.defaultProps = {
  isLastItem: false,
};

export default ThreadItem;
