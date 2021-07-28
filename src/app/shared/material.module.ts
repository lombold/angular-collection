import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonToggleModule} from "@angular/material/button-toggle";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonToggleModule,
  ],
})
export class MaterialModule { }
