import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesOrderRoutingModule } from './sales-order-routing.module';
import { ManageSalesOrderComponent } from './sales-order-manage/pages/manage-sales-order/manage-sales-order.component';
import { SalesOrderListComponent } from './sales-order-manage/components/sales-order-list/sales-order-list.component';
import { CreateSalesOrderComponent } from './sales-order-manage/components/create-sales-order/create-sales-order.component';
import { SharedModule } from '../../shared/shared.module';
import { AsignInventoryComponent } from './sales-order-manage/components/asign-inventory/asign-inventory.component';
import { UpdateDocketComponent } from './sales-order-manage/components/update-docket/update-docket.component';
import { InventoryOrderWiseComponent } from './sales-order-manage/components/inventory-order-wise/inventory-order-wise.component';


@NgModule({
  declarations: [
    ManageSalesOrderComponent,
    SalesOrderListComponent,
    CreateSalesOrderComponent,
    AsignInventoryComponent,
    UpdateDocketComponent,
    InventoryOrderWiseComponent
  ],
  imports: [
    CommonModule,
    SalesOrderRoutingModule,
    SharedModule
  ]
})
export class SalesOrderModule { }
