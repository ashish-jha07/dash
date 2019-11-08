import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ResetFormComponent} from './reset-form.component';

const routes: Routes = [
  {
    path: '',
    component: ResetFormComponent
  }
];

@NgModule({
  
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ResetFormRoutingModule { }
