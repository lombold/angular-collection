import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeListDetailComponent } from './employee-list-detail.component';

describe('EmployeeListDetailComponent', () => {
  let component: EmployeeListDetailComponent;
  let fixture: ComponentFixture<EmployeeListDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
