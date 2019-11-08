import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetPassComponent } from './forget-pass/forget-pass.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadChildren: './auth-signup/auth-signup.module#AuthSignupModule'
      },
      {
        path: 'signin',
        loadChildren: './auth-signin/auth-signin.module#AuthSigninModule'
      },
      {
        path: 'resetPasword/:id',
        loadChildren : './reset-form/reset-form.module#ResetFormModule'
      },
      {
      path: 'forgetpass',
      component : ForgetPassComponent

      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
