import { NgModule } from '@angular/core';
import {EditUserDetailComponent} from './edit-user-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: ':id',
    component: EditUserDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],exports: [RouterModule]
})
export class EditUserRoutingModule { }
