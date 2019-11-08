import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { EditUserRoutingModule } from '../tables/edit-user-detail/edit-user-routing.module';
// import {ConfirmationDialogComponent} from '../../../theme/shared/components/confirmation-dialog/confirmation-dialog.component'
import {ConfirmationDialogComponent} from '../../../theme/shared/components/confirmation-dialog/confirmation-dialog.component'
import { TablesRoutingModule } from './tables-routing.module';
import { LoaderComponent } from '../../../theme/shared/components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoaderService} from '../../../theme/shared/components/loader.service'
import { LoaderInterceptor } from '../../../theme/shared/components/loader/loader.interceptor';
import {SharedModule} from '../../../theme/shared/shared.module';

// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    MatProgressSpinnerModule,
    SharedModule
    // LoaderComponent
    // ConfirmationDialogComponent
    // EditUserRoutingModule
  ],
  declarations: [],
  // providers: [LoaderService,
  //   { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }]
})
export class TablesModule { }
