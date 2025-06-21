import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDeviceComponent } from './mangae-devices/pages/manage-device/manage-device.component';
import { InventoryListComponent } from './mangae-devices/components/inventory-list/inventory-list.component';

const routes: Routes = [
  {
    path:'device-list',component:ManageDeviceComponent
  },
  {
    path:'inventory-list',component:InventoryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
