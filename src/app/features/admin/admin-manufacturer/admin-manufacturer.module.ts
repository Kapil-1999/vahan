import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManufacturerRoutingModule } from './admin-manufacturer-routing.module';
import { ManageAdminManufactureComponent } from './admin-manufacturer-manage/pages/manage-admin-manufacture/manage-admin-manufacture.component';
import { AdminManufacturerListComponent } from './admin-manufacturer-manage/components/admin-manufacturer-list/admin-manufacturer-list.component';
import { CreateAdminManufacturerComponent } from './admin-manufacturer-manage/components/create-admin-manufacturer/create-admin-manufacturer.component';
import { SharedModule } from '../../shared/shared.module';
import { ManageUploadComponent } from './upload-certificate/pages/manage-upload/manage-upload.component';
import { ManageStockComponent } from './upload-stock/pages/manage-stock/manage-stock.component';
import { CertificateListComponent } from './upload-certificate/component/certificate-list/certificate-list.component';
import { UploadCertificateComponent } from './upload-certificate/component/upload-certificate/upload-certificate.component';
import { StockListComponent } from './upload-stock/component/stock-list/stock-list.component';
import { CreateStockComponent } from './upload-stock/component/create-stock/create-stock.component';
import { AddBulkStockComponent } from './upload-stock/component/add-bulk-stock/add-bulk-stock.component';


@NgModule({
  declarations: [
    ManageAdminManufactureComponent,
    AdminManufacturerListComponent,
    CreateAdminManufacturerComponent,
    ManageUploadComponent,
    ManageStockComponent,
    CertificateListComponent,
    UploadCertificateComponent,
    StockListComponent,
    CreateStockComponent,
    AddBulkStockComponent
  ],
  imports: [
    CommonModule,
    AdminManufacturerRoutingModule,
    SharedModule
  ]
})
export class AdminManufacturerModule { }
