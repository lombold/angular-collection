import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "@core/domain/employee";
import {EmployeeService} from "@core/services/employee.service";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
export class EmployeeCreateComponent implements OnInit {

  employee!: Employee;

  constructor(
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employee = {
      firstname: '',
      lastname: '',
      birthday: new Date(),
      lastLogin: new Date(),
    }
  }

  submitForm(employee: Employee): void {
    this.employeeService.create(employee).subscribe(employee => console.log('saved employee', employee));
  }
}
