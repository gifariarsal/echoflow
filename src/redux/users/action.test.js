/**
 * test scenario for action
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncRegisterUser } from './action';
import api from '../../utils/api';

const fakeRegisterResponse = {
  data: {
    user: {
      id: 'user-123',
      name: 'User Test 123',
      email: 'user123example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

const fakeUserData = {
  name: 'Testing',
  email: 'testing@example.com',
  password: '123456',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;
  });

  it('should dispatch action correctly when register success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeRegisterResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock register
    api.register = vi.fn();

    // action
    await asyncRegisterUser(fakeUserData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.register).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncRegisterUser(fakeUserData)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});