import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { GenerateInvoiceComponent } from './component/generate-invoice/generate-invoice.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { PaymentHistoryComponent } from './component/payment-history/payment-history.component';

const routes: Routes = [
  {
    path : 'order-details' , component :ManageOrderComponent
  },
  {
    path : 'order-details/:id/:createdBy', component : GenerateInvoiceComponent
  },
  {
    path : 'order-history/:id/:createdBy', component : OrderHistoryComponent
  },
  {
    path : 'payment-history/:id/:createdBy', component : PaymentHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
