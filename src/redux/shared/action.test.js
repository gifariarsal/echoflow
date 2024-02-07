/**
 * test scenario for action
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncPopulateLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { asyncPopulateLeaderboards, asyncPopulateUsersAndThreads } from "./action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";
import api from "../../utils/api";
import { receiveLeaderboardsActionCreator } from "../leaderboards/action";

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeUsersResponse = [
  {
    id: 'users-1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'users-2',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 25,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
    beforeEach(() => {
      api._getAllUsers = api.getAllUsers;
      api._getAllThreads = api.getAllThreads;
    });

    afterEach(() => {
      api.getAllUsers = api._getAllUsers;
      api.getAllThreads = api._getAllThreads;

      // delete backup
      delete api._getAllUsers;
      delete api._getAllThreads;
    });

    it('should dispatch action correctly when data fetching success', async () => {
      // arrange
      // stub implementation
      api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
      api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

      // mock dispatch
      const dispatch = vi.fn();

      // action
      await asyncPopulateUsersAndThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        receiveThreadsActionCreator(fakeThreadsResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(
        receiveUsersActionCreator(fakeUsersResponse)
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action and call alert correctly when data fetching failed', async () => {
      // arrange
      // stub implementation
      api.getAllUsers = () => Promise.reject(fakeErrorResponse);
      api.getAllThreads = () => Promise.reject(fakeErrorResponse);
      // mock dispatch
      const dispatch = vi.fn();
      // mock alert
      window.alert = vi.fn();

      // action
      await asyncPopulateUsersAndThreads()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
});

describe('asyncPopulateLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getAllLeaderboards = api.getAllleaderBoards;
  });

  afterEach(() => {
    // restore original implementation
    api.getAllleaderBoards = api._getAllLeaderboards;

    // delete backup
    delete api._getAllLeaderboards;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllleaderBoards = () => Promise.resolve(fakeLeaderboardsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and cell alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllleaderBoards = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();
    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});