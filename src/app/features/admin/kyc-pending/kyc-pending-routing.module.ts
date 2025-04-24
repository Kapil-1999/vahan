import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageKycPendingComponent } from './kyc-pending-manage/pages/manage-kyc-pending/manage-kyc-pending.component';

const routes: Routes = [
  {
    path:'kyc-pending-list',component:ManageKycPendingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KycPendingRoutingModule { }
