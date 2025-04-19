import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageShippingComponent } from './pages/manage-shipping/manage-shipping.component';

const routes: Routes = [
  {
    path : 'shipping-details', component : ManageShippingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingAddressRoutingModule { }
