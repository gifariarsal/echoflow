/**
 * Test scenario for authUserReducer
 *
 * - should return the initial state when given by unknown action
 * - should return authUser when given by SET_AUTH_USER action
 * - should return null when given by UNSET_AUTH_USER action
 */

import { describe, expect, it } from 'vitest';
import { ActionType } from './action';
import authUserReducer from './reducer';

describe('AuthUser function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return authUser when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
