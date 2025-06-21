import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRequestRoutingModule } from './my-request-routing.module';
import { MyRequestComponent } from './pages/my-request/my-request.component';
import { RequestListComponent } from './component/request-list/request-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddRequestComponent } from './component/add-request/add-request.component';
import { ChangeRequestStatusComponent } from './component/change-request-status/change-request-status.component';
import { OrderRequestHistoryComponent } from './component/order-request-history/order-request-history.component';
import { RequestPaymentComponent } from './component/request-payment/request-payment.component';
import { RequestInvoiceGenerateComponent } from './component/request-invoice-generate/request-invoice-generate.component';
import { PaymentRequestHistoryComponent } from './component/payment-request-history/payment-request-history.component';
import { VerifyRequestStatusChangeComponent } from './component/verify-request-status-change/verify-request-status-change.component';


@NgModule({
  declarations: [
    MyRequestComponent,
    RequestListComponent,
    AddRequestComponent,
    ChangeRequestStatusComponent,
    OrderRequestHistoryComponent,
    RequestPaymentComponent,
    RequestInvoiceGenerateComponent,
    PaymentRequestHistoryComponent,
    VerifyRequestStatusChangeComponent
  ],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    SharedModule
  ]
})
export class MyRequestModule { }
