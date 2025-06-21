import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesManagerRoutingModule } from './sales-manager-routing.module';
import { ManageSalesManagerComponent } from './sales-manager-manage/pages/manage-sales-manager/manage-sales-manager.component';
import { SalesManagerListComponent } from './sales-manager-manage/components/sales-manager-list/sales-manager-list.component';
import { CreateSalesManagerComponent } from './sales-manager-manage/components/create-sales-manager/create-sales-manager.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageSalesManagerComponent,
    SalesManagerListComponent,
    CreateSalesManagerComponent
  ],
  imports: [
    CommonModule,
    SalesManagerRoutingModule,
    SharedModule
  ]
})
export class SalesManagerModule { }
