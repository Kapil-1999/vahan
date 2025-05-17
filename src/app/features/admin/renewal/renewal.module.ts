import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RenewalRoutingModule } from './renewal-routing.module';
import { ManageRenewalComponent } from './manage-renewal/pages/manage-renewal/manage-renewal.component';
import { UpcomingExpiryComponent } from './manage-renewal/components/upcoming-expiry/upcoming-expiry.component';
import { ExpiredComponent } from './manage-renewal/components/expired/expired.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageRenewalComponent,
    UpcomingExpiryComponent,
    ExpiredComponent
  ],
  imports: [
    CommonModule,
    RenewalRoutingModule,
    SharedModule
  ]
})
export class RenewalModule { }
