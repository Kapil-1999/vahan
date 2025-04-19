import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippingAddressRoutingModule } from './shipping-address-routing.module';
import { ManageShippingComponent } from './pages/manage-shipping/manage-shipping.component';
import { ShippingListComponent } from './component/shipping-list/shipping-list.component';
import { AddShippingAddressComponent } from './component/add-shipping-address/add-shipping-address.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageShippingComponent,
    ShippingListComponent,
    AddShippingAddressComponent
  ],
  imports: [
    CommonModule,
    ShippingAddressRoutingModule,
    SharedModule
  ]
})
export class ShippingAddressModule { }
