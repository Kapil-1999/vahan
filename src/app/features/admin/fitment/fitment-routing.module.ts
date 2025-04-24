import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageFitmentComponent } from './fitment-manage/pages/manage-fitment/manage-fitment.component';

const routes: Routes = [
  {
    path:'fitment-list',component:ManageFitmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitmentRoutingModule { }
