import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetFormRoutingModule } from './reset-form-routing.module';
import { ResetFormComponent } from './reset-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import {MatFormFieldModule,} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ResetFormRoutingModule,
    MatFormFieldModule,
    MatInputModule
    

  ],
  declarations: [ResetFormComponent]
})
export class ResetFormModule { }

