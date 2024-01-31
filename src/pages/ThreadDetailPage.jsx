import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
} from '../redux/threadDetail/action';
import ThreadDetail from '../components/thread/ThreadDetail';
import ThreadComment from '../components/thread/ThreadComment';

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

  if (!threadDetail) {
    return null;
  }

  return (
    <Box w="full" minH="calc(100vh - 60px)" bg="bg.primary" p={4}>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="bg.secondary"
        minH="calc(100vh - 60px - 32px)"
        rounded="xl"
      >
        <ThreadDetail {...threadDetail} authUser={authUser} />
        <ThreadComment
          threadDetail={threadDetail}
          authUser={authUser}
          onAddComment={onAddComment}
        />
      </Box>
    </Box>
  );
}

export default ThreadDetailPage;
