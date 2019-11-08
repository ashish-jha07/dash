import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'userDefaul',
        loadChildren: './tbl-bootstrap/tbl-bootstrap.module#TblBootstrapModule'
      },
      {
        path: 'reset',
        loadChildren: './edit-user-detail/edit-user-detail.module#EditUserDetailModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule { }
