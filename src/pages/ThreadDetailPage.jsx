import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralDownVoteThreadDetail,
  asyncToggleNeutralUpVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleUpVoteCommentDetail,
  asyncToggleDownVoteCommentDetail,
  asyncToggleNeutralUpVoteCommentDetail,
  asyncToggleNeutralDownVoteCommentDetail,
} from '../redux/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import ThreadComment from '../components/ThreadComment';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content, commentTo: id }));
  };

  const onUpVoteThreadDetail = (threadId) => {
    dispatch(asyncToggleUpVoteThreadDetail(threadId));
  };

  const onDownVoteThreadDetail = (threadId) => {
    dispatch(asyncToggleDownVoteThreadDetail(threadId));
  };

  const onNeutralizeUpVoteThreadDetail = (threadId) => {
    dispatch(asyncToggleNeutralUpVoteThreadDetail(threadId));
  };

  const onNeutralizeDownVoteThreadDetail = (threadId) => {
    dispatch(asyncToggleNeutralDownVoteThreadDetail(threadId));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteCommentDetail(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteCommentDetail(commentId));
  };

  const onNeutralizeUpVoteComment = (commentId) => {
    dispatch(asyncToggleNeutralUpVoteCommentDetail(commentId));
  };

  const onNeutralizeDownVoteComment = (commentId) => {
    dispatch(asyncToggleNeutralDownVoteCommentDetail(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <Box w="full" minH="100vh" bg="bg.primary" p={4}>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="bg.secondary"
        minH="100vh"
        rounded="xl"
      >
        <ThreadDetail
          {...threadDetail}
          authUser={authUser}
          onUpVoteThreadDetail={onUpVoteThreadDetail}
          onDownVoteThreadDetail={onDownVoteThreadDetail}
          onNeutralizeUpVoteThreadDetail={onNeutralizeUpVoteThreadDetail}
          onNeutralizeDownVoteThreadDetail={onNeutralizeDownVoteThreadDetail}
        />
        <ThreadComment
          threadDetail={threadDetail}
          authUser={authUser}
          onAddComment={onAddComment}
          onUpVoteComment={onUpVoteComment}
          onDownVoteComment={onDownVoteComment}
          onNeutralizeUpVoteComment={onNeutralizeUpVoteComment}
          onNeutralizeDownVoteComment={onNeutralizeDownVoteComment}
        />
      </Box>
    </Box>
  );
}

export default ThreadDetailPage;
