import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {concatMap, map, mergeMap, tap} from 'rxjs/operators';
import * as CounterActions from './counter.actions';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "@shared/dialogs/confirmation-dialog/confirmation-dialog.component";


@Injectable()
export class CounterEffects {

  resetCounters$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CounterActions.resetRequested),
      mergeMap((action) => {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);

        return dialogRef.afterClosed().pipe(
          map(result => {
              if (result) {
                return CounterActions.resetApproved()
              } else {
                return CounterActions.resetCancelled()
              }
          })
        );
      }),
    );
  });

  constructor(private actions$: Actions, public dialog: MatDialog) {}

}
