import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

@NgModule({
  imports: [
    CommonModule,
    AuthSigninRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
