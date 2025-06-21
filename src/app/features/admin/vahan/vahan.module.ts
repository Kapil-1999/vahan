import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VahanRoutingModule } from './vahan-routing.module';
import { ManageVahanComponent } from './pages/manage-vahan/manage-vahan.component';
import { VahanListComponent } from './component/vahan-list/vahan-list.component';
import { share } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { VahanListDetailsComponent } from './component/vahan-list-details/vahan-list-details.component';


@NgModule({
  declarations: [
    ManageVahanComponent,
    VahanListComponent,
    VahanListDetailsComponent
  ],
  imports: [
    CommonModule,
    VahanRoutingModule,
    SharedModule
  ]
})
export class VahanModule { }
