import {createAction} from "@ngrx/store";

export const increment = createAction('[StatefulClick Component] Increment');
export const decrement = createAction('[StatefulClick Component] Decrement');
export const resetRequested = createAction('[StatefulClick Component] Reset Requested');
export const resetApproved = createAction('[StatefulClick Component] Reset Approved');
export const resetCancelled = createAction('[StatefulClick Component] Reset Cancelled');
