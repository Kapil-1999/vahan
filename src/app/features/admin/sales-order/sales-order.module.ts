import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { ManageSalesOrderComponent } from './sales-order-manage/pages/manage-sales-order/manage-sales-order.component';
import { SalesOrderListComponent } from './sales-order-manage/components/sales-order-list/sales-order-list.component';
import { CreateSalesOrderComponent } from './sales-order-manage/components/create-sales-order/create-sales-order.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageSalesOrderComponent,
    SalesOrderListComponent,
    CreateSalesOrderComponent
  ],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    SharedModule
  ]
})
export class SalesOrderModule { }
