import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  ADD_THREAD: 'ADD_THREAD',
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
  TOGGLE_NEUTRAL_UP_VOTE_THREAD: 'TOGGLE_NEUTRAL_UP_VOTE_THREAD',
  TOGGLE_NEUTRAL_DOWN_VOTE_THREAD: 'TOGGLE_NEUTRAL_DOWN_VOTE_THREAD',
};

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function toggleUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralUpVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralDownVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddTread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.toggleUpVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
    );
    try {
      await api.toggleDownVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToggleNeutralUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralUpVoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await api.toggleNeutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralUpVoteThreadActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

function asyncToggleNeutralDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralDownVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
      })
    );

    try {
      await api.toggleNeutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralDownVoteThreadActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralUpVoteThreadActionCreator,
  toggleNeutralDownVoteThreadActionCreator,
  asyncAddTread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralUpVoteThread,
  asyncToggleNeutralDownVoteThread,
};
