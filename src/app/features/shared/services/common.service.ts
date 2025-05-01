import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../http-service/api.service';
import { API_CONSTANT } from '../constant/API.Constant';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectUser } from '../../../core/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private apiService : ApiService,
    private store : Store<AppState>
  ) {

   }

   getUserDetails(): Observable<any> {
    return this.store.select(selectUser);
  }

  manufacturerList(payload:any): Observable<any> {
    let url = API_CONSTANT.adminManufacturerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateDropdownList(){
    let url = API_CONSTANT.stateDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateListOnDeviceType() {
    let url = API_CONSTANT.stateListOnDeviceType
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  planBasedOnState(payload:any) {
    let url = API_CONSTANT.planBasedOnState
    return this.apiService
      .post(url,payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  cityDropdown(payload: any): Observable<any> {
    let url = API_CONSTANT.cityDropdown
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  
  createState(payload: any): Observable<any> {
    let url = API_CONSTANT.createState
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addCity(payload: any): Observable<any> {
    let url = API_CONSTANT.addCity
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  productList(): Observable<any> {
    let url = API_CONSTANT.productList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  authorityList(): Observable<any> {
    let url = API_CONSTANT.authorityList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  distributerDropdown(payload: any): Observable<any> {
    let url = API_CONSTANT.distributerDropdown
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  dealerListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.dealerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  managerList(payload: any): Observable<any> {
    let url = API_CONSTANT.managerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  categoryList(): Observable<any> {
    let url = API_CONSTANT.categoryList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getGstList(): Observable<any> {
    let url = API_CONSTANT.gstList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
  
  headtList(payload: any): Observable<any> {
    let url = API_CONSTANT.headListDD
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleTypeDropdown(){
    let url = API_CONSTANT.vehicleType
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  backendList(): Observable<any> {
    let url = API_CONSTANT.backendList
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  rtoListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.rtoList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  paymentMode(): Observable<any> {
    let url = API_CONSTANT.paymentMode
    return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  paymentStatusList(): Observable<any> {
    let url = API_CONSTANT.paymentStatusList
    return this.apiService
    .get(url)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
