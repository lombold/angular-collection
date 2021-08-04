import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickRoutingModule } from './click-routing.module';
import { StatefulClickComponent } from './containers/stateful-click/stateful-click.component';
import {ClickComponent} from "@feature/click/containers/click/click.component";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    StatefulClickComponent,
    ClickComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClickRoutingModule
  ]
})
export class ClickModule { }
