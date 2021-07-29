import {Component, Input, OnInit} from '@angular/core';
import {Employee} from "@core/domain/employee";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  @Input() employee!: Employee | null;

  constructor() { }

  ngOnInit(): void {
  }

}
