import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "@core/domain/employee";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  @Input() employee!: Employee | null;
  @Output() submit: EventEmitter<Employee> = new EventEmitter();

  employeeForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    birthday: [''],
    lastLogin: [''],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.patchForm();
  }

  private patchForm(): void {
    if (this.employee) {
      this.employeeForm.patchValue({
        firstname: this.employee.firstname,
        lastname: this.employee.lastname,
        birthday: this.employee.birthday,
        lastLogin: this.employee.lastLogin,
      })
    }
  }

  public submitForm() {
    if (this.employeeForm.valid) {
      let {firstname, lastname, birthday, lastLogin} = this.employeeForm.value;
      const employee = {
        firstname,
        lastname,
        birthday,
        lastLogin,
      }
      this.submit.emit(employee);
    }
  }

}
