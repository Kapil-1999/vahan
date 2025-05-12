import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyComplainComponent } from './pages/my-complain/my-complain.component';

const routes: Routes = [
  {
   
      path:'complain-list',component:MyComplainComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyComplainRoutingModule { }
