import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { GenerateInvoiceComponent } from './component/generate-invoice/generate-invoice.component';

const routes: Routes = [
  {
    path : 'order-details' , component :ManageOrderComponent
  },
  {
    path : 'order-details/:id', component : GenerateInvoiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
