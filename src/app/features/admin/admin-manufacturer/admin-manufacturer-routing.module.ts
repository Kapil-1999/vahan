import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAdminManufactureComponent } from './admin-manufacturer-manage/pages/manage-admin-manufacture/manage-admin-manufacture.component';
import { ManageUploadComponent } from './upload-certificate/pages/manage-upload/manage-upload.component';
import { ManageStockComponent } from './upload-stock/pages/manage-stock/manage-stock.component';

const routes: Routes = [
  {
    path : 'manufacturer-list', component: ManageAdminManufactureComponent
  },
  {
  path : 'certificate-list' , component : ManageUploadComponent
  },
  {
    path : 'stock-list' , component : ManageStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManufacturerRoutingModule { }
