import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDistributerComponent } from './distributer-manage/pages/manage-distributer/manage-distributer.component';

const routes: Routes = [
  {
    path:'distributer-list',component:ManageDistributerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributerRoutingModule { }
