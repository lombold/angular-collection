import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {concatMap, tap} from 'rxjs/operators';
import * as CounterActions from './counter.actions';


@Injectable()
export class CounterEffects {

 // https://ngrx.io/guide/effects/lifecycle#non-dispatching-effects
  resetCounters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CounterActions.reset),
      tap((state) => {
        console.log("effect triggered: ", state);
      })
    );
  }, { dispatch: false });


  constructor(private actions$: Actions) {}

}
