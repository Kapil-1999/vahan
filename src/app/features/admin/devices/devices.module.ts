import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { ManageDeviceComponent } from './mangae-devices/pages/manage-device/manage-device.component';
import { DeviceListComponent } from './mangae-devices/components/device-list/device-list.component';
import { CreateDeviceComponent } from './mangae-devices/components/create-device/create-device.component';
import { SharedModule } from '../../shared/shared.module';
import { InventoryListComponent } from './mangae-devices/components/inventory-list/inventory-list.component';


@NgModule({
  declarations: [
    ManageDeviceComponent,
    DeviceListComponent,
    CreateDeviceComponent,
    InventoryListComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule
  ]
})
export class DevicesModule { }
