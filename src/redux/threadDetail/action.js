import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  ADD_COMMENT: 'ADD_COMMENT',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_COMMENT_DETAIL: 'TOGGLE_UP_VOTE_COMMENT_DETAIL',
  TOGGLE_DOWN_VOTE_COMMENT_DETAIL: 'TOGGLE_DOWN_VOTE_COMMENT_DETAIL',
  CLEAR_VOTE_THREAD_DETAIL: 'CLEAR_VOTE_THREAD_DETAIL',
  CLEAR_VOTE_COMMENT_DETAIL: 'CLEAR_VOTE_COMMENT_DETAIL',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function clearVoteTreadDetailActionCreator(userId) {
  return {
    type: ActionType.CLEAR_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentDetailActionCreator({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function toggleDownVoteCommentDetailActionCreator({ userId, commentId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT_DETAIL,
    payload: {
      userId,
      commentId,
    },
  };
}

function clearVoteCommentActionCreator() {
  return {
    type: ActionType.CLEAR_VOTE_COMMENT_DETAIL,
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ content, commentTo }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ content, commentTo });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.toggleUpVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    try {
      await api.toggleDownVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteCommentDetail(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(
      toggleUpVoteCommentDetailActionCreator({ commentId, userId: authUser.id })
    );
    try {
      await api.toggleUpVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleDownVoteCommentDetail(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(
      toggleDownVoteCommentDetailActionCreator({
        commentId,
        userId: authUser.id,
      })
    );
    try {
      await api.toggleDownVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncClearVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(clearVoteTreadDetailActionCreator(authUser.id));
    try {
      await api.toggleNeutralizeVoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncClearVoteCommentDetail(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(clearVoteCommentActionCreator(authUser.id, commentId));
    try {
      await api.toggleNeutralizeVoteComment(threadDetail.id, commentId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  addCommentActionCreator,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleUpVoteCommentDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleDownVoteCommentDetailActionCreator,
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteCommentDetail,
  asyncToggleDownVoteCommentDetail,
  asyncClearVoteThreadDetail,
  asyncClearVoteCommentDetail,
};
