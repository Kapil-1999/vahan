import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RawDataRoutingModule } from './raw-data-routing.module';
import { ManageRawComponent } from './pages/manage-raw/manage-raw.component';
import { RawDataListComponent } from './component/raw-data-list/raw-data-list.component';
import { RawDataFilterComponent } from './component/raw-data-filter/raw-data-filter.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageRawComponent,
    RawDataListComponent,
    RawDataFilterComponent
  ],
  imports: [
    CommonModule,
    RawDataRoutingModule,
    SharedModule
  ]
})
export class RawDataModule { }
