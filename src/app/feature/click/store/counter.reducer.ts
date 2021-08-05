import {Action, createReducer, on} from '@ngrx/store';
import {decrement, increment, resetApproved, resetRequested} from "@feature/click/store/counter.actions";

export const initialState = 0;

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(resetApproved, (state) => 0)
);

export function counterReducer(state: number | undefined, action: Action) {
  return _counterReducer(state, action);
}
