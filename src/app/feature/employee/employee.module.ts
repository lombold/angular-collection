import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import { EmployeeShowComponent } from './containers/employee-show/employee-show.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDashboardComponent } from './containers/employee-dashboard/employee-dashboard.component';
import { EmployeeCreateComponent } from './containers/employee-create/employee-create.component';
import { EmployeeEditComponent } from './containers/employee-edit/employee-edit.component';
import { EmployeeComponent } from './components/employee/employee.component';


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeShowComponent,
    EmployeeFormComponent,
    EmployeeDashboardComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
