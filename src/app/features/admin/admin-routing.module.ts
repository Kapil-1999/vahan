import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'manufacturer',
    loadChildren: () => import('../admin/admin-manufacturer/admin-manufacturer.module').then(m => m.AdminManufacturerModule)
  },
  {
    path: 'distributer',
    loadChildren: () => import('../admin/distributer/distributer.module').then(m => m.DistributerModule)
  },
  {
    path: 'dealer',
    loadChildren: () => import('../admin/dealer/dealer.module').then(m => m.DealerModule)
  },
{
    path : 'device',
    loadChildren:() => import('../admin/devices/devices.module').then(m => m.DevicesModule)
  },
  {
    path : 'sales-manager',
    loadChildren:() => import('../admin/sales-manager/sales-manager.module').then(m => m.SalesManagerModule)
  },
  {
    path : 'sales-order',
    loadChildren:() => import('../admin/sales-order/sales-order.module').then(m => m.SalesOrderModule)
  },
  {
    path : 'orders',
    loadChildren: () => import('../admin/order/order.module').then(m => m.OrderModule)
  },
  {
    path : 'masters',
    loadChildren: () => import('../admin/master/master.module').then(m => m.MasterModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
