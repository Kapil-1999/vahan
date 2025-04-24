import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KycPendingRoutingModule } from './kyc-pending-routing.module';
import { ManageKycPendingComponent } from './kyc-pending-manage/pages/manage-kyc-pending/manage-kyc-pending.component';
import { KycPendingListComponent } from './kyc-pending-manage/components/kyc-pending-list/kyc-pending-list.component';
import { SharedModule } from '../../shared/shared.module';
import { CreateKycPendingComponent } from './kyc-pending-manage/components/create-kyc-pending/create-kyc-pending.component';


@NgModule({
  declarations: [
    ManageKycPendingComponent,
    KycPendingListComponent,
    CreateKycPendingComponent
  ],
  imports: [
    CommonModule,
    KycPendingRoutingModule,
    SharedModule
  ]
})
export class KycPendingModule { }
