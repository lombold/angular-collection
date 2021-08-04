import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClickComponent} from "@feature/click/click/click.component";
import {StatefulClickComponent} from "@feature/click/stateful-click/stateful-click.component";

const routes: Routes = [
  { path: 'stateful', component: StatefulClickComponent },
  { path: '**', component: ClickComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClickRoutingModule { }
