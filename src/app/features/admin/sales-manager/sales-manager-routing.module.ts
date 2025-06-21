import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSalesManagerComponent } from './sales-manager-manage/pages/manage-sales-manager/manage-sales-manager.component';

const routes: Routes = [
  {
    path:'manager-list',component:ManageSalesManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesManagerRoutingModule { }
