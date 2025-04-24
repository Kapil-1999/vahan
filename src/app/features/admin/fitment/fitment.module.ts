import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FitmentRoutingModule } from './fitment-routing.module';
import { ManageFitmentComponent } from './fitment-manage/pages/manage-fitment/manage-fitment.component';
import { FitmentListComponent } from './fitment-manage/components/fitment-list/fitment-list.component';
import { CreateFitmentComponent } from './fitment-manage/components/create-fitment/create-fitment.component';
import { SharedModule } from '../../shared/shared.module';
import { SimDetailComponent } from './fitment-manage/components/action-detail/sim-detail/sim-detail.component';
import { CustomerDetailComponent } from './fitment-manage/components/action-detail/customer-detail/customer-detail.component';
import { VehicleDetailComponent } from './fitment-manage/components/action-detail/vehicle-detail/vehicle-detail.component';
import { DeviceDetailComponent } from './fitment-manage/components/action-detail/device-detail/device-detail.component';
import { MoveComponent } from './fitment-manage/components/action-detail/move/move.component';
import { StatusComponent } from './fitment-manage/components/action-detail/status/status.component';
import { CertificateComponent } from './fitment-manage/components/action-detail/certificate/certificate.component';
import { MisDetailComponent } from './fitment-manage/components/action-detail/mis-detail/mis-detail.component';
import { MisDownloadComponent } from './fitment-manage/components/action-detail/mis-download/mis-download.component';
import { DownloadCertificateComponent } from './fitment-manage/components/action-detail/download-certificate/download-certificate.component';


@NgModule({
  declarations: [
    ManageFitmentComponent,
    FitmentListComponent,
    CreateFitmentComponent,
    SimDetailComponent,
    CustomerDetailComponent,
    VehicleDetailComponent,
    DeviceDetailComponent,
    MoveComponent,
    StatusComponent,
    CertificateComponent,
    MisDetailComponent,
    MisDownloadComponent,
    DownloadCertificateComponent
  ],
  imports: [
    CommonModule,
    FitmentRoutingModule,
    SharedModule
  ]
})
export class FitmentModule { }
