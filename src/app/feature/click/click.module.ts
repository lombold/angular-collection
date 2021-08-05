import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClickRoutingModule} from './click-routing.module';
import {StatefulClickComponent} from './containers/stateful-click/stateful-click.component';
import {ClickComponent} from "@feature/click/containers/click/click.component";
import {SharedModule} from "@shared/shared.module";
import {StoreModule} from "@ngrx/store";
import {counterReducer} from "@feature/click/store/counter.reducer";
import {featureKey} from "@feature/click/store/counter.selectors";
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/counter.effects';


@NgModule({
  declarations: [
    StatefulClickComponent,
    ClickComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ClickRoutingModule,
    StoreModule.forFeature(
      featureKey,
      {
        count: counterReducer
      }, {}),
    EffectsModule.forFeature([CounterEffects]),
  ]
})
export class ClickModule {
}
