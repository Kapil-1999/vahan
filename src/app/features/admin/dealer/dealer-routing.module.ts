import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDealerComponent } from './dealer-manage/pages/manage-dealer/manage-dealer.component';

const routes: Routes = [
  {
    path:'dealer-list',component:ManageDealerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealerRoutingModule { }
