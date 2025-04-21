import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBackendMasterComponent } from './backend-master/pages/manage-backend-master/manage-backend-master.component';
import { ManageStateMasterComponent } from './state-master/pages/manage-state-master/manage-state-master.component';
import { ManageRtoComponent } from './rto-master/pages/manage-rto/manage-rto.component';
import { ManageProductComponent } from './product-master/pages/manage-product/manage-product.component';
import { ManageAuthorityComponent } from './authority-master/pages/manage-authority/manage-authority.component';
import { ManageAuthorityPlanComponent } from './authority-plan-master/pages/manage-authority-plan/manage-authority-plan.component';
import { ManageCityComponent } from './city-master/pages/manage-city/manage-city.component';
import { ManageCategoryComponent } from './category-master/pages/manage-category/manage-category.component';
import { ManageSubCategoryComponent } from './sub-category-master/pages/manage-sub-category/manage-sub-category.component';
import { ManageComplainComponent } from './complain-master/pages/manage-complain/manage-complain.component';
import { ManageServiceComponent } from './service-master/pages/manage-service/manage-service.component';
import { ManageHsnComponent } from './hsn-master/pages/manage-hsn/manage-hsn.component';

const routes: Routes = [
  {path:'backend-list',component:ManageBackendMasterComponent},
  {path:'state-list',component:ManageStateMasterComponent},
  {path:'rto-list',component:ManageRtoComponent},
  {path:'product-list',component:ManageProductComponent},
  {path:'authority-list',component:ManageAuthorityComponent},
  {path:'authority-plan-list',component:ManageAuthorityPlanComponent},
  {path:'city-list',component:ManageCityComponent},
  {path:'category-list',component:ManageCategoryComponent},
  {path:'sub-category-list',component:ManageSubCategoryComponent},
  {path:'complain-list',component:ManageComplainComponent},
  {path:'service-list',component:ManageServiceComponent},
  {path:'hsn-list',component:ManageHsnComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
