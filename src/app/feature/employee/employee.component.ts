import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../core/services/employee.service";
import {Employee} from "../../core/domain/employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.fetchData();
  }

  private fetchData() {
    this.employeeService.getAll().subscribe(employees => this.employees = employees);
  }

}
