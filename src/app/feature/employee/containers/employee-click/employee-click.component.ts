import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, combineLatest, fromEvent, merge, Observable, of, Subject, Subscription} from "rxjs";
import {map, scan, takeUntil, tap} from "rxjs/operators";
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


  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.leftClicks$ = fromEvent(this.hitbox.nativeElement,'click');
    this.rightClicks$ = fromEvent(this.hitbox.nativeElement, 'contextmenu');
    this.clicks$ = merge(this.leftClicks$, this.rightClicks$);

    this.counter$ =
      combineLatest([this.clicks$, this.currentMethod$]).pipe(
        tap((current) => console.log('Before' + current)),
        // Map the click event to a counting function
        map<any, (acc:number) => number>(([click, method]) => {
          switch (method) {
            case CountingMethod.SCREEN:
              return (acc) => this.countScreen(click, acc);
            case CountingMethod.SEMISCREEN:
              return (acc) => this.countSemiScreen(click, acc);
            case CountingMethod.LEFT_RIGHT:
              return (acc) => this.countLeftRight(click, acc);
            default:
              return (acc) => this.countScreen(click, acc);
          }
        }),
        tap((current) => console.log('Counting Method' + current)),
        // Execute the counting function with the current accumulator (starting with 0)
        scan<any, number>((acc, countMethod) => countMethod(acc), 0),
        tap((current) => console.log('After' + current)),
        // Complete when the component gets destroyed
        takeUntil(this.destroy$),
      )

    this.preventContextMenu = this.rightClicks$.subscribe((event) => event.preventDefault());
  }

  ngOnDestroy(): void {
    this.preventContextMenu.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    this.currentMethod$.complete();
  }

  onToggleChange($event: MatButtonToggleChange) {
    this.currentMethod$.next($event.value);
  }

  countScreen(event: MouseEvent, acc: number): number {
    return acc + 1;
  }

  countSemiScreen(event: MouseEvent, acc: number): number {
    if (event.pageX >= document.body.clientWidth / 2)
      return acc + 1;
    else
      return acc - 1;
  }

  countLeftRight(event: MouseEvent, acc: number): number {
    if (event.button === 0)
      return acc + 1;
    else
      event.preventDefault();
      return acc - 1;
  }
}
