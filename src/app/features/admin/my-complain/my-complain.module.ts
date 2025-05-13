import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyComplainRoutingModule } from './my-complain-routing.module';
import { MyComplainComponent } from './pages/my-complain/my-complain.component';
import { MyComplainListComponent } from './components/my-complain-list/my-complain-list.component';
import { SharedModule } from '../../shared/shared.module';
import { GenerateComplainComponent } from './components/generate-complain/generate-complain.component';
import { AssignComplainComponent } from './components/assign-complain/assign-complain.component';
import { ResponseComplainComponent } from './components/response-complain/response-complain.component';


@NgModule({
  declarations: [
    MyComplainComponent,
    MyComplainListComponent,
    GenerateComplainComponent,
    AssignComplainComponent,
    ResponseComplainComponent
  ],
  imports: [
    CommonModule,
    MyComplainRoutingModule,
    SharedModule
  ]
})
export class MyComplainModule { }
