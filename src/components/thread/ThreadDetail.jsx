import React from 'react';
import PropTypes from 'prop-types';
import {
  BiUpvote,
  BiSolidUpvote,
  BiDownvote,
  BiSolidDownvote,
} from 'react-icons/bi';
import parse from 'html-react-parser';
import {
  Avatar, Box, Heading, Text
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { postedAt } from '../../utils';
import ThreadItemFooterButton from './ThreadItemFooterButton';
import { userShape, detailThreadShape } from '../../utils/propShape';
import {
  asyncClearVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
} from '../../redux/threadDetail/action';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
}) {
  const dispatch = useDispatch();
  const hasVotedUp = upVotesBy.includes(authUser?.id);
  const hasVotedDown = downVotesBy.includes(authUser?.id);

  const onUpVoteThreadDetail = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onNeutralizeVoteThreadDetail = () => {
    dispatch(asyncClearVoteThreadDetail());
  };

  const onClickUpVote = (event) => {
    event.stopPropagation();
    if (hasVotedUp) {
      onNeutralizeVoteThreadDetail(id);
    } else {
      if (hasVotedDown) {
        onNeutralizeVoteThreadDetail(id);
      }
      onUpVoteThreadDetail(id);
    }
  };

  const onClickDownVote = (event) => {
    event.stopPropagation();
    if (hasVotedDown) {
      onNeutralizeVoteThreadDetail(id);
    } else {
      if (hasVotedUp) {
        onNeutralizeVoteThreadDetail(id);
      }
      onDownVoteThreadDetail(id);
    }
  };

  return (
    <Box as="section">
      <Box pb={2} borderBottom="1px solid" borderColor="silver">
        <header>
          <Text color="brand.main" mb={2}>{`#${category}`}</Text>
        </header>
        <Box as="article">
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
          {parse(body)}
        </Box>
        <footer>
          <Box display="flex" alignItems="center" gap={4} my={2}>
            <ThreadItemFooterButton
              icon={hasVotedUp ? <BiSolidUpvote color="green" /> : <BiUpvote />}
              title="Upvote"
              value={upVotesBy.length}
              onClick={
                authUser ? onClickUpVote : () => alert('Please login to upvote')
              }
            />
            <ThreadItemFooterButton
              icon={
                hasVotedDown ? <BiSolidDownvote color="red" /> : <BiDownvote />
              }
              title="Downvote"
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
    </Box>
  );
}

ThreadDetail.propTypes = {
  ...detailThreadShape,
  authUser: PropTypes.shape(userShape),
};

ThreadDetail.defaultProps = {
  authUser: null,
};

export default ThreadDetail;
