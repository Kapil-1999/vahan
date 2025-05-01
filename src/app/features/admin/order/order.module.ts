import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PlaceOrderRequestComponent } from './component/place-order-request/place-order-request.component';
import { GenerateInvoiceComponent } from './component/generate-invoice/generate-invoice.component';
import { VahanDeviceDropdownComponent } from './component/vahan-device-dropdown/vahan-device-dropdown.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { OrderHistoryDetailsComponent } from './component/order-history-details/order-history-details.component';
import { OrderStatusChangeComponent } from './component/order-status-change/order-status-change.component';
import { PaymentHistoryComponent } from './component/payment-history/payment-history.component';
import { VerifyStatusChangeComponent } from './component/verify-status-change/verify-status-change.component';


@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderListComponent,
    PlaceOrderRequestComponent,
    GenerateInvoiceComponent,
    VahanDeviceDropdownComponent,
    OrderHistoryComponent,
    OrderHistoryDetailsComponent,
    OrderStatusChangeComponent,
    PaymentHistoryComponent,
    VerifyStatusChangeComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
