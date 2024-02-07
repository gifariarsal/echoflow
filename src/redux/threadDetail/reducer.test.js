/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *  - should return the initial state when given by unknown action
 *  - should add a new comment to the thread's comments when given by ADD_COMMENT action
 *  - should return the comments with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT
 *  - should return the comments with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT
 *  - should remove a user's vote from a comment when given by CLEAR_VOTE_COMMENT_DETAIL action
 *
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import threadDetailReducer from './reducer';

describe('threadReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should add a new comment to the thread's comments when given by ADD_COMMENT action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Test',
      body: 'Thread Test 1',
      category: 'react',
      user: 'user-1',
      createdAt: '2022-09-22T10:06:55.588Z',
      comments: [
        {
          id: 'comment-1',
          content: 'Comment Test 1',
          createdAt: '2022-09-22T10:06:55.588Z',
          upVotesBy: [],
          downVotesBy: [],
          owner: {
            id: 'users-1',
            name: 'Traxex',
            email: 'drow.ranger@dota2.com',
          },
        },
      ],
    };

    const newComment = {
      id: 'comment-2',
      content: 'New Comment Test',
      createdAt: '2022-09-30T12:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'user-2',
        name: 'Invoker',
        email: 'invoker@dota2.com',
      },
    };

    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([newComment, ...initialState.comments]);
  });

  it('should return the comments with the toggled up vote comment when given by TOGGLE_UP_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: ['user-2'],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_UP_VOTE_COMMENT_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain(action.payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(
      action.payload.userId
    );
  });

  it('should return the comments with the toggled down vote comment when given by TOGGLE_DOWN_VOTE_COMMENT', () => {
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_COMMENT_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-2',
      },
    };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].downVotesBy).toContain(action.payload.userId);
    expect(nextState.comments[0].upVotesBy).not.toContain(
      action.payload.userId
    );
  });

  it("should remove a user's vote from a comment when given by CLEAR_VOTE_COMMENT_DETAIL action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      comments: [
        {
          id: 'comment-1',
          upVotesBy: ['user-1'],
          downVotesBy: ['user-2'], // Assuming user-2 has downvoted
        },
      ],
    };

    const action = {
      type: ActionType.CLEAR_VOTE_COMMENT_DETAIL,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1', // Removing up vote from user-1
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).not.toContain('user-1'); // User-1's upvote should be removed
    expect(nextState.comments[0].downVotesBy).toContain('user-2'); // User-2's downvote remains unchanged
  });
});
