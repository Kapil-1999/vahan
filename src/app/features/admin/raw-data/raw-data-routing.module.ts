import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRawComponent } from './pages/manage-raw/manage-raw.component';

const routes: Routes = [
  {
    path : 'list', component : ManageRawComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RawDataRoutingModule { }
