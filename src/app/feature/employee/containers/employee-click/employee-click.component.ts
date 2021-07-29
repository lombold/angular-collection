import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, Subject, Subscription} from "rxjs";
import {distinctUntilChanged, map, scan, takeUntil, tap, withLatestFrom} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

enum CountingMethod {
  SCREEN = 'Screen',
  SEMISCREEN = 'Semi Screen',
  LEFT_RIGHT = 'Left-Right',
}

@Component({
  selector: 'app-employee-click',
  templateUrl: './employee-click.component.html',
  styleUrls: ['./employee-click.component.scss']
})
export class EmployeeClickComponent implements AfterViewInit, OnInit, OnDestroy {

  countingMethod = CountingMethod;

  @ViewChild('hitbox') hitbox!: ElementRef<HTMLInputElement>;

  public counter$ = of()
  private destroy$ = new Subject<void>();
  private leftClicks$!: Observable<Event>;
  private rightClicks$!: Observable<Event>;
  private clicks$!: Observable<Event>;

  private currentMethod$ = new BehaviorSubject<string>(CountingMethod.SCREEN);
  private preventContextMenu!: Subscription;

  config: any = {
    [CountingMethod.SCREEN]: (click: any) => this.countScreen(click),
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leftClicks$ = fromEvent(this.hitbox.nativeElement,'click');
    this.rightClicks$ =
      fromEvent(this.hitbox.nativeElement, 'contextmenu')
      .pipe(tap((event) => event.preventDefault()));
    this.clicks$ = merge(this.leftClicks$, this.rightClicks$);

    // this.counter$ =
    //   combineLatest([this.clicks$, this.currentMethod$]).pipe(
    //     // Only pass if it is a different click then the previous
    //     distinctUntilChanged(([prevClick, ...prevRest], [currClick, ...currRest]) => prevClick === currClick),
    //     withLatestFrom(this.currentMethod$),
    //     // Map the click event to a counting function
    //     map<any, number>(([click, method]) => {
    //
    //       // return this.config[method](click);
    //
    //       switch (method) {
    //         case CountingMethod.SCREEN:
    //           return this.countScreen(click);
    //         case CountingMethod.SEMISCREEN:
    //           return this.countSemiScreen(click);
    //         case CountingMethod.LEFT_RIGHT:
    //           return this.countLeftRight(click);
    //         default:
    //           return this.countScreen(click);
    //       }
    //     }),
    //     // Execute the counting function with the current accumulator (starting with 0)
    //     scan<number, number>((acc, num) => acc + num, 0),
    //     // Take until the component is destroyed
    //     takeUntil(this.destroy$),
    //   )

    this.counter$ = this.clicks$.pipe(
        withLatestFrom(this.currentMethod$),
        // Map the click event to a counting function
        map<any, number>(([click, method]) => {

          // return this.config[method](click);

          switch (method) {
            case CountingMethod.SCREEN:
              return this.countScreen(click);
            case CountingMethod.SEMISCREEN:
              return this.countSemiScreen(click);
            case CountingMethod.LEFT_RIGHT:
              return this.countLeftRight(click);
            default:
              return this.countScreen(click);
          }
        }),
        // Execute the counting function with the current accumulator (starting with 0)
        scan<number, number>((acc, num) => acc + num, 0),
        // Take until the component is destroyed
        takeUntil(this.destroy$),
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.currentMethod$.complete(); // Optional
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.currentMethod$.next($event.value);
  }

  countScreen(event: MouseEvent): number {
    return 1;
  }

  countSemiScreen(event: MouseEvent): number {
    if (event.pageX >= document.body.clientWidth / 2)
      return 1;
    else
      return -1;
  }

  countLeftRight(event: MouseEvent): number {
    if (event.button === 0)
      return 1;
    else
      event.preventDefault();
      return -1;
  }
}
