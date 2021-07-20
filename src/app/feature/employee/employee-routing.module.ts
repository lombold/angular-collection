import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeDashboardComponent} from "./containers/employee-dashboard/employee-dashboard.component";
import {EmployeeCreateComponent} from "@feature/employee/containers/employee-create/employee-create.component";
import {EmployeeEditComponent} from "@feature/employee/containers/employee-edit/employee-edit.component";
import {EmployeeShowComponent} from "@feature/employee/containers/employee-show/employee-show.component";

const routes: Routes = [
  { path: 'new', component: EmployeeCreateComponent },
  { path: ':id', component: EmployeeShowComponent },
  { path: ':id/edit', component: EmployeeEditComponent },
  { path: '**', component: EmployeeDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
