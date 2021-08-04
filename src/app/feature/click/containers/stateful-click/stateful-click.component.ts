import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable, of, Subject} from "rxjs";
import {takeUntil, tap, withLatestFrom} from "rxjs/operators";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {CountingMethod} from "@feature/click/counting-method";
import {select, Store} from "@ngrx/store";
import {decrement, increment, reset} from "@feature/click/store/counter.actions";
import {selectCounter, selectFeature} from "@feature/click/store/counter.selectors";
import {AppState} from "@core/store/AppState";

@Component({
  selector: 'app-stateful-click',
  templateUrl: './stateful-click.component.html',
  styleUrls: ['./stateful-click.component.scss']
})
export class StatefulClickComponent implements OnInit, OnDestroy, AfterViewInit {

  countingMethod = CountingMethod;

  @ViewChild('hitbox') hitbox!: ElementRef<HTMLInputElement>;

  public counter$: Observable<number> = of();
  private destroy$ = new Subject<void>();
  private leftClicks$!: Observable<MouseEvent>;
  private rightClicks$!: Observable<MouseEvent>;
  private clicks$!: Observable<MouseEvent>;

  private currentMethod$ = new BehaviorSubject<string>(CountingMethod.SCREEN);

  private counterInteractions$: Observable<[MouseEvent, string]> = of();

  config: any = {
    [CountingMethod.SCREEN]: (click: any) => this.countScreen(click),
  }

  constructor(
    private store: Store<AppState>,
  ) {
    this.counter$ = this.store.select(selectCounter);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leftClicks$ = fromEvent<MouseEvent>(this.hitbox.nativeElement,'click');
    this.rightClicks$ =
      fromEvent<MouseEvent>(this.hitbox.nativeElement, 'contextmenu')
        .pipe(tap((event) => event.preventDefault()));
    this.clicks$ = merge(this.leftClicks$, this.rightClicks$);


    this.counterInteractions$ = this.clicks$.pipe(
      withLatestFrom(this.currentMethod$),
      // Take until the component is destroyed
      takeUntil(this.destroy$),
    )


    this.counterInteractions$.subscribe(([click, method]) => {
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
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.currentMethod$.next($event.value);
  }

  countScreen(event: MouseEvent): void {
    this.store.dispatch(increment());
  }

  countSemiScreen(event: MouseEvent): void {
    if (event.pageX >= document.body.clientWidth / 2)
      this.store.dispatch(increment());
    else
      this.store.dispatch(decrement());;
  }

  countLeftRight(event: MouseEvent): void {
    if (event.button === 0)
      this.store.dispatch(increment());
    else
      this.store.dispatch(decrement());
  }

  onReset($event: MouseEvent) {
    this.store.dispatch(reset())
  }
}
