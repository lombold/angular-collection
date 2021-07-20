import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Employee} from "@core/domain/employee";
import {EmployeeService} from "@core/services/employee.service";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @Input() employee$: Observable<Employee> = of();
  private selectedId: string = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.employee$ = this.route.paramMap.pipe(
      switchMap((params, index) => {
        let id = params.get('id');
        this.selectedId = id ? id : '';
        return this.employeeService.get(this.selectedId);
      })
    );
  }

  submitForm(employee: Employee) {
    const subscription = this.employeeService.update(employee).subscribe(
      employee => {
        console.log('saved employee', employee);
        subscription.unsubscribe();
      }
    );
  }
}
