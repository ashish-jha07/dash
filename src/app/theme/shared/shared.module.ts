import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BreadcrumbModule, CardModule} from './components';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmDialogService} from './components/confirmation-dialog/confirm-dialog.service';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoaderService} from '../shared/components/loader.service';
import {LoaderInterceptor} from '../shared/components/loader/loader.interceptor'
import {AuthInterceptor} from '../shared/components/loader/Auth.Interceptor.'
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// import {LoaderComponent} from './components/loader/loader.component'
@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    ClickOutsideModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule
    // BrowserAnimationsModule
  ],
  // entryComponents: [
  //   LoaderComponent
  // ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    BreadcrumbModule,
    ClickOutsideModule,
    MatDialogModule,
    MatButtonModule,
    ConfirmationDialogComponent,
    LoaderComponent
    // BrowserAnimationsModule
  ],
  declarations: [
    ConfirmationDialogComponent,
    LoaderComponent
  ],
  providers: [ LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ConfirmDialogService
  ]
})
export class SharedModule { }
