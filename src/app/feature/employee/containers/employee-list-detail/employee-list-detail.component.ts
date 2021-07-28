import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "@core/services/employee.service";
import {HealthService} from "@core/services/health.service";
import {ActivatedRoute, Router} from "@angular/router";
import {from, fromEvent, Observable, of, throwError} from "rxjs";
import {Employee} from "@core/domain/employee";
import {concatAll, concatMap, filter, first, map, mergeMap, pluck} from "rxjs/operators";

@Component({
  selector: 'app-employee-list-detail',
  templateUrl: './employee-list-detail.component.html',
  styleUrls: ['./employee-list-detail.component.scss']
})
export class EmployeeListDetailComponent implements OnInit {

  firstEmployee$: Observable<Employee> = of();

  constructor(
    private employeeService: EmployeeService,
    private healthService: HealthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.firstEmployee$ = this.employeeService.getAll().pipe(
      // Take the first [Employee]
      // first(),
      // Create Observables of every Employee in the retrieved array
      // map(employees => from(employees)),
      // Remove hierarchy of observables
      concatAll(),
      // Pluck the ID of each Employee object
      pluck<Employee, string>('id'),
      // Take the first ID
      first(),
      // Map the ID to a Observable of the corresponding Employee from the backend
      concatMap((id: string) => this.employeeService.get(id)),
    );
  }

  ngOnInit(): void {

  }

}
