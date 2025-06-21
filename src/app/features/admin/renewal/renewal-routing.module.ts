import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRenewalComponent } from './manage-renewal/pages/manage-renewal/manage-renewal.component';

const routes: Routes = [
  {
    path:'renewal-list',component:ManageRenewalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewalRoutingModule { }
