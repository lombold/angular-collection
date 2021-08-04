import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'employees', loadChildren: () => import('./feature/employee/employee.module').then(m => m.EmployeeModule) },
  { path: 'clicks', loadChildren: () => import('./feature/click/click.module').then(m => m.ClickModule) },
  { path: '**', redirectTo: 'employees'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
