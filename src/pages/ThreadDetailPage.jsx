import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteThreadDetail,
} from '../redux/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';

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
          authUser={authUser.id}
          onAddComment={onAddComment}
          onUpVoteThreadDetail={onUpVoteThreadDetail}
          onDownVoteThreadDetail={onDownVoteThreadDetail}
        />
      </Box>
    </Box>
  );
}

export default ThreadDetailPage;
