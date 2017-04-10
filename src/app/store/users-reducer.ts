import { Action } from '@ngrx/store';

export function userReducer(state = { user: 'John' }, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
