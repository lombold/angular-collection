import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from "@core/services/employee.service";
import {Employee} from "@core/domain/employee";
import {forkJoin, Observable, Subject} from "rxjs";
import {filter, takeUntil} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {HealthStatus} from "@core/domain/health-status";
import {HealthService} from "@core/services/health.service";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit, OnDestroy {

  employees!: Employee[];
  healthStatus!: HealthStatus;

  private destroy$ = new Subject<void>();

  constructor(
    private employeeService: EmployeeService,
    private healthService: HealthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    forkJoin({
      health: this.healthService.getHealth(),
      employees: this.employeeService.getAll()
    })
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(({health, employees}) => {
      this.healthStatus = health;
      this.employees = employees;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public showEmployee(employee: Employee) {
    this.router.navigate([employee.id], {relativeTo: this.route});
  }

  public editEmployee(employee: Employee) {
    this.router.navigate([employee.id, 'edit'], {relativeTo: this.route});
  }

  public deleteEmployee(employee: Employee) {
    if (!employee.id) {
      return
    }
    this.employeeService.delete(employee.id).subscribe(
      () => console.log('deleted')
    );
  }
}
