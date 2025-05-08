import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageVahanComponent } from './pages/manage-vahan/manage-vahan.component';

const routes: Routes = [
  {
    path : 'vahan-list', component :ManageVahanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VahanRoutingModule { }
