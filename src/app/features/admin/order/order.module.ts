import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { OrderListComponent } from './component/order-list/order-list.component';
import { SharedModule } from '../../shared/shared.module';
import { PlaceOrderRequestComponent } from './component/place-order-request/place-order-request.component';
import { GenerateInvoiceComponent } from './component/generate-invoice/generate-invoice.component';


@NgModule({
  declarations: [
    ManageOrderComponent,
    OrderListComponent,
    PlaceOrderRequestComponent,
    GenerateInvoiceComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }
