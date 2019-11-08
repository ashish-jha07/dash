import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatButtonModule} from '@angular/material/button';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';

import { TblBootstrapRoutingModule } from './tbl-bootstrap-routing.module';
import { TblBootstrapComponent } from './tbl-bootstrap.component';
import {SharedModule} from '../../../../theme/shared/shared.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import {ConfirmationDialogComponent} from '../../../../theme/shared/components/confirmation-dialog/confirmation-dialog.component'
import {LoaderComponent} from '../../../../theme/shared/components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    TblBootstrapRoutingModule,
    MatProgressSpinnerModule,
    SharedModule,
    // BrowserModule,
    NgxPaginationModule,
    MatPaginatorModule,
    Ng2SearchPipeModule
    // LoaderComponent
    // ConfirmationDialogComponent
    // BrowserAnimationsModule,
    // MatButtonModule,
    // MatDialogModule
  ],
  declarations: [TblBootstrapComponent]
})
export class TblBootstrapModule { }
