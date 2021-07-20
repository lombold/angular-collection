import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Employee} from "@core/domain/employee";
import {EmployeeService} from "@core/services/employee.service";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  styleUrls: ['./employee-show.component.scss']
})
export class EmployeeShowComponent implements OnInit {

  selectedId: string = '';
  employee$: Observable<Employee> = of();

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params, index) => {
        let id = params.get('id');
        this.selectedId = id ? id : '';
        return this.employeeService.get(this.selectedId);
      })
    );
  }
}
