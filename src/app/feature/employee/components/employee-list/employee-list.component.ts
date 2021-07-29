import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "@core/domain/employee";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Employee[] | null = [];
  @Output() show: EventEmitter<Employee> = new EventEmitter();
  @Output() edit: EventEmitter<Employee> = new EventEmitter();
  @Output() delete: EventEmitter<Employee> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
