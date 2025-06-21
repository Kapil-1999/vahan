import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSalesOrderComponent } from './sales-order-manage/pages/manage-sales-order/manage-sales-order.component';
import { InventoryOrderWiseComponent } from './sales-order-manage/components/inventory-order-wise/inventory-order-wise.component';

const routes: Routes = [
  {
    path:'sales-order-list',component:ManageSalesOrderComponent
  },
  {
    path:'inventory-order-detail/:id',component:InventoryOrderWiseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
