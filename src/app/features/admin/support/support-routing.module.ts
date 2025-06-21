import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageSupportComponent } from './support-manage/pages/manage-support/manage-support.component';

const routes: Routes = [
  {
    path:'support-list',component:ManageSupportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
