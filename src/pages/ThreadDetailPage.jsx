import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
} from '../redux/threadDetail/action';
import ThreadDetail from '../components/thread/ThreadDetail';
import ThreadComment from '../components/thread/ThreadComment';
import Layout from '../components/common/Layout';

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
    <Layout>
      <ThreadDetail {...threadDetail} authUser={authUser} />
      <ThreadComment
        threadDetail={threadDetail}
        authUser={authUser}
        onAddComment={onAddComment}
      />
    </Layout>
  );
}

export default ThreadDetailPage;
