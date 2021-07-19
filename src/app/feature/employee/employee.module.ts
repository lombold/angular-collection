import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import { EmployeeShowComponent } from './components/employee-show/employee-show.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDashboardComponent } from './containers/employee-dashboard/employee-dashboard.component';


@NgModule({
  declarations: [
    EmployeeComponent,
    EmployeeListComponent,
    EmployeeShowComponent,
    EmployeeFormComponent,
    EmployeeDashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRoutingModule,
  ]
})
export class EmployeeModule { }
