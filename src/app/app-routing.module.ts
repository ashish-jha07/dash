import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/signup',
        pathMatch: 'full'
      },
      {
        path: 'auth', 
        loadChildren: './demo/pages/authentication/authentication.module#AuthenticationModule',
        canLoad: [ AuthGuard ]

      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],

    children: [
      // {
      //   path: '',
      //   redirectTo: '/dashboard/default',
      //   pathMatch: 'full'
      // },
      {
        path: 'dashboard',
        loadChildren: './demo/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'basic',
        loadChildren: './demo/ui-elements/ui-basic/ui-basic.module#UiBasicModule'
      },
      {
        path: 'forms',
        loadChildren: './demo/pages/form-elements/form-elements.module#FormElementsModule'
      },
      {
        path: 'User',
        loadChildren: './demo/pages/tables/tables.module#TablesModule'
      },
      {
        path: 'charts',
        loadChildren: './demo/pages/core-chart/core-chart.module#CoreChartModule'
      },
      {
        path: 'sample-page',
        loadChildren: './demo/extra/sample-page/sample-page.module#SamplePageModule'
      },
      // dashboard/default
    ]
  },
  
];



// {
//   path: '',
//   component: FooterOnlyLayoutComponent,
//   children: [
//     { path: 'login', loadChildren: () => LoginModule },
//     { path: 'registration', loadChildren: () => RegistrationModule }
//   ]
// },


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
