import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';


import { AuthSignupRoutingModule } from './auth-signup-routing.module'
import { AuthSignupComponent } from './auth-signup.component';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
