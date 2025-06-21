import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DealerRoutingModule } from './dealer-routing.module';
import { ManageDealerComponent } from './dealer-manage/pages/manage-dealer/manage-dealer.component';
import { DealerListComponent } from './dealer-manage/components/dealer-list/dealer-list.component';
import { CreateDealerComponent } from './dealer-manage/components/create-dealer/create-dealer.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageDealerComponent,
    DealerListComponent,
    CreateDealerComponent
  ],
  imports: [
    CommonModule,
    DealerRoutingModule,
    SharedModule
  ]
})
export class DealerModule { }
