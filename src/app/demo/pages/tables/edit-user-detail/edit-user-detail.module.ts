import { NgModule } from '@angular/core';
import {EditUserDetailComponent} from './edit-user-detail.component'
import {SharedModule} from './../../../../theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import {EditUserRoutingModule} from './edit-user-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  
  imports: [
    CommonModule,
   EditUserRoutingModule,
   SharedModule, 
    MatProgressSpinnerModule
  ],
  declarations: [EditUserDetailComponent],
})
export class EditUserDetailModule { }


 