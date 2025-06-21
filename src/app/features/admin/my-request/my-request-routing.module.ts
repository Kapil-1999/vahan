import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestComponent } from './pages/my-request/my-request.component';
import { OrderRequestHistoryComponent } from './component/order-request-history/order-request-history.component';
import { PaymentRequestHistoryComponent } from './component/payment-request-history/payment-request-history.component';

const routes: Routes = [
  {
    path : 'request-list', component : MyRequestComponent,
  },
    {
      path : 'order-request-history/:id/:createdBy', component : OrderRequestHistoryComponent
    },
    {
        path : 'payment-request-history/:id/:createdBy', component : PaymentRequestHistoryComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRequestRoutingModule { }
