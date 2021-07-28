import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, fromEvent, Observable, of, Subject} from "rxjs";
import {map, scan, takeUntil, tap} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-employee-click',
  templateUrl: './employee-click.component.html',
  styleUrls: ['./employee-click.component.scss']
})
export class EmployeeClickComponent implements OnInit, OnDestroy {

  public counter$ = of()
  private destroy$ = new Subject<void>();
  private clicks$: Observable<Event> = fromEvent(document,'click');

  private countingMethod$ = new BehaviorSubject<string>('screen');


  constructor() {
    this.counter$ = this.clicks$.pipe(
      tap((current) => console.log('Before' + current)),
      map(() => 1),
      scan(((acc, value) => acc + value)),
      tap((current) => console.log('After' + current)),
      takeUntil(this.destroy$),
      takeUntil(this.countingMethod$),
    )
  }

  ngOnInit(): void {
    // this.countingMethod$.subscribe((method) => {
    //   switch (method) {
    //     case 'screen':
    //       break;
    //     case 'semiscreen':
    //       break;
    //     case 'left-right':
    //       break;
    //     default:
    //
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.countingMethod$.complete();
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.countingMethod$.next($event.value);
  }
}
