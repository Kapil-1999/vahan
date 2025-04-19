import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { ManageBackendMasterComponent } from './backend-master/pages/manage-backend-master/manage-backend-master.component';
import { BackendListComponent } from './backend-master/components/backend-list/backend-list.component';
import { CreateBackendComponent } from './backend-master/components/create-backend/create-backend.component';
import { ManageStateMasterComponent } from './state-master/pages/manage-state-master/manage-state-master.component';
import { StateListComponent } from './state-master/components/state-list/state-list.component';
import { CreateStateComponent } from './state-master/components/create-state/create-state.component';
import { ManageRtoComponent } from './rto-master/pages/manage-rto/manage-rto.component';
import { RtoListComponent } from './rto-master/components/rto-list/rto-list.component';
import { CreateRtoComponent } from './rto-master/components/create-rto/create-rto.component';
import { ManageProductComponent } from './product-master/pages/manage-product/manage-product.component';
import { ProductListComponent } from './product-master/components/product-list/product-list.component';
import { CreateProductComponent } from './product-master/components/create-product/create-product.component';
import { ManageAuthorityComponent } from './authority-master/pages/manage-authority/manage-authority.component';
import { AuthorityListComponent } from './authority-master/components/authority-list/authority-list.component';
import { CreateAuthorityComponent } from './authority-master/components/create-authority/create-authority.component';
import { ManageAuthorityPlanComponent } from './authority-plan-master/pages/manage-authority-plan/manage-authority-plan.component';
import { AuthorityPlanListComponent } from './authority-plan-master/components/authority-plan-list/authority-plan-list.component';
import { CreateAuthorityPlanComponent } from './authority-plan-master/components/create-authority-plan/create-authority-plan.component';
import { ManageCityComponent } from './city-master/pages/manage-city/manage-city.component';
import { CityListComponent } from './city-master/components/city-list/city-list.component';
import { CreateCityComponent } from './city-master/components/create-city/create-city.component';
import { ManageCategoryComponent } from './category-master/pages/manage-category/manage-category.component';
import { CategoryListComponent } from './category-master/components/category-list/category-list.component';
import { CreateCategoryComponent } from './category-master/components/create-category/create-category.component';
import { ManageSubCategoryComponent } from './sub-category-master/pages/manage-sub-category/manage-sub-category.component';
import { SubCategoryListComponent } from './sub-category-master/components/sub-category-list/sub-category-list.component';
import { CreateSubCategoryComponent } from './sub-category-master/components/create-sub-category/create-sub-category.component';
import { ManageComplainComponent } from './complain-master/pages/manage-complain/manage-complain.component';
import { ComplainListComponent } from './complain-master/components/complain-list/complain-list.component';
import { CreateComplainComponent } from './complain-master/components/create-complain/create-complain.component';
import { ManageServiceComponent } from './service-master/pages/manage-service/manage-service.component';
import { ServiceListComponent } from './service-master/components/service-list/service-list.component';
import { CreateServiceComponent } from './service-master/components/create-service/create-service.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ManageBackendMasterComponent,
    BackendListComponent,
    CreateBackendComponent,
    ManageStateMasterComponent,
    StateListComponent,
    CreateStateComponent,
    ManageRtoComponent,
    RtoListComponent,
    CreateRtoComponent,
    ManageProductComponent,
    ProductListComponent,
    CreateProductComponent,
    ManageAuthorityComponent,
    AuthorityListComponent,
    CreateAuthorityComponent,
    ManageAuthorityPlanComponent,
    AuthorityPlanListComponent,
    CreateAuthorityPlanComponent,
    ManageCityComponent,
    CityListComponent,
    CreateCityComponent,
    ManageCategoryComponent,
    CategoryListComponent,
    CreateCategoryComponent,
    ManageSubCategoryComponent,
    SubCategoryListComponent,
    CreateSubCategoryComponent,
    ManageComplainComponent,
    ComplainListComponent,
    CreateComplainComponent,
    ManageServiceComponent,
    ServiceListComponent,
    CreateServiceComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule
  ]
})
export class MasterModule { }
