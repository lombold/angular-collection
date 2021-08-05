import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { MaterialModule } from './material.module';
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    ConfirmationDialogComponent
  ],
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
