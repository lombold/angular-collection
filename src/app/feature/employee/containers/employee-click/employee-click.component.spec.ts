import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClickComponent } from './employee-click.component';

describe('EmployeeClickComponent', () => {
  let component: EmployeeClickComponent;
  let fixture: ComponentFixture<EmployeeClickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeClickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeClickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
