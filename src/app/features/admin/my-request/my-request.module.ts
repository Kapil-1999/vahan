import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyRequestRoutingModule } from './my-request-routing.module';
import { MyRequestComponent } from './pages/my-request/my-request.component';
import { RequestListComponent } from './component/request-list/request-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddRequestComponent } from './component/add-request/add-request.component';


@NgModule({
  declarations: [
    MyRequestComponent,
    RequestListComponent,
    AddRequestComponent
  ],
  imports: [
    CommonModule,
    MyRequestRoutingModule,
    SharedModule
  ]
})
export class MyRequestModule { }
