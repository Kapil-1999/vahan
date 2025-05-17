import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchDetailRoutingModule } from './search-detail-routing.module';
import { SearchDetailManageComponent } from './manage-search/pages/search-detail-manage/search-detail-manage.component';
import { DeviceDetailComponent } from './manage-search/components/device-detail/device-detail.component';
import { VehicleDetailComponent } from './manage-search/components/vehicle-detail/vehicle-detail.component';
import { SearchListComponent } from './manage-search/components/search-list/search-list.component';
import { SharedModule } from '../../shared/shared.module';
import { FitmentDetailComponent } from './manage-search/components/fitment-detail/fitment-detail.component';
import { RequestDetailComponent } from './manage-search/components/request-detail/request-detail.component';
import { ComplainDetailsComponent } from './manage-search/components/complain-details/complain-details.component';



@NgModule({
  declarations: [
    SearchDetailManageComponent,
    DeviceDetailComponent,
    VehicleDetailComponent,
    SearchListComponent,
    FitmentDetailComponent,
    RequestDetailComponent,
    ComplainDetailsComponent
  ],
  imports: [
    CommonModule,
    SearchDetailRoutingModule,
    SharedModule
  ]
})
export class SearchDetailModule { }
