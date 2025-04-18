import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSalesOrderComponent } from './sales-order-manage/pages/manage-sales-order/manage-sales-order.component';

const routes: Routes = [
  {
    path:'sales-order-list',component:ManageSalesOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesOrderRoutingModule { }
