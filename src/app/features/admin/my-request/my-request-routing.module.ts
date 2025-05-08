import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRequestComponent } from './pages/my-request/my-request.component';

const routes: Routes = [
  {
    path : 'request-list', component : MyRequestComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRequestRoutingModule { }
