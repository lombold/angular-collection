import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatefulClickComponent } from './stateful-click.component';

describe('StatefulClickComponent', () => {
  let component: StatefulClickComponent;
  let fixture: ComponentFixture<StatefulClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatefulClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatefulClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
