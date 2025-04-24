import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { ManageSupportComponent } from './support-manage/pages/manage-support/manage-support.component';
import { SupportListComponent } from './support-manage/components/support-list/support-list.component';
import { CreateSupportComponent } from './support-manage/components/create-support/create-support.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageSupportComponent,
    SupportListComponent,
    CreateSupportComponent
  ],
  imports: [
    CommonModule,
    SupportRoutingModule,
    SharedModule
  ]
})
export class SupportModule { }
