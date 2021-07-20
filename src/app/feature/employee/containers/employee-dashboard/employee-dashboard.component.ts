import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "@core/services/employee.service";
import {Employee} from "@core/domain/employee";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeToEdit!: Employee;
  employees$: Observable<Employee[]> = this.employeeService.getAll();

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
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
