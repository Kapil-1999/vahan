import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchDetailManageComponent } from './manage-search/pages/search-detail-manage/search-detail-manage.component';

const routes: Routes = [
  {
    path:'search-detail',component:SearchDetailManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchDetailRoutingModule { }
