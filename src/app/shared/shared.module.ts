import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { MaterialModule } from './material.module';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
