import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {AuthenttticationService} from '../authentication/authentttication.service';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';


@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  declarations: [ForgetPassComponent],
  providers:[AuthenttticationService]
})
export class AuthenticationModule  { }
