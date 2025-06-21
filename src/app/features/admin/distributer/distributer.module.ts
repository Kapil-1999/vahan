import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributerRoutingModule } from './distributer-routing.module';
import { ManageDistributerComponent } from './distributer-manage/pages/manage-distributer/manage-distributer.component';
import { DistributerListComponent } from './distributer-manage/components/distributer-list/distributer-list.component';
import { CreateDistributerComponent } from './distributer-manage/components/create-distributer/create-distributer.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageDistributerComponent,
    DistributerListComponent,
    CreateDistributerComponent
  ],
  imports: [
    CommonModule,
    DistributerRoutingModule,
    SharedModule
  ]
})
export class DistributerModule { }
