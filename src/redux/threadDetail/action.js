import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL:
    'TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_COMMENT_DETAIL: 'TOGGLE_UP_VOTE_COMMENT_DETAIL',
  TOGGLE_DOWN_VOTE_COMMENT_DETAIL: 'TOGGLE_DOWN_VOTE_COMMENT_DETAIL',
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

function toggleUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
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

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await api.toggleDownVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleNeutralUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralUpVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      await api.toggleNeutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralUpVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleNeutralDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralDownVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      await api.toggleNeutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
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

export {
  ActionType,
  addCommentActionCreator,
  receiveThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralUpVoteThreadDetailActionCreator,
  toggleNeutralDownVoteThreadDetailActionCreator,
  toggleUpVoteCommentDetailActionCreator,
  toggleDownVoteCommentDetailActionCreator,
  clearVoteCommentActionCreator,
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralUpVoteThreadDetail,
  asyncToggleNeutralDownVoteThreadDetail,
  asyncToggleUpVoteCommentDetail,
  asyncClearVoteCommentDetail,
  asyncToggleDownVoteCommentDetail,
};
