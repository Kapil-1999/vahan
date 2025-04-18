import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SafeHtmlPipe } from './services/safe-html.service';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './component/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SearchFilterPipe } from './pipe/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from "ngx-bootstrap/modal";
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './component/profile/profile.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MatNativeDateModule } from "@angular/material/core";
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    NavbarComponent,
    HeaderComponent,
    MainLayoutComponent,
    SafeHtmlPipe,
    LoginComponent,
    PageNotFoundComponent,
    LoaderComponent,
    SearchFilterPipe,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    SelectDropDownModule,
    MatNativeDateModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule

  ],
  exports: [
    SafeHtmlPipe,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SearchFilterPipe,
    LoaderComponent,
    NgxPaginationModule,
    ModalModule,
    FormsModule,
    ToastrModule,
    SelectDropDownModule,
    MatButtonModule,
    MatMenuModule,
    MatNativeDateModule,
    MatIconModule
  ]
})
export class SharedModule { }
