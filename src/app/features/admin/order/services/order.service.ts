import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';
import { ApiService } from '../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private apiService: ApiService
  ) { }

  orderDashboard(payload: any): Observable<any> {
    let url = API_CONSTANT.orderDashboard
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  orderProductList(payload: any): Observable<any> {
    let url = API_CONSTANT.orderProductList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  generateOrder(payload: any): Observable<any> {
    let url = API_CONSTANT.generateOrder
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  requestById(payload: any): Observable<any> {
    let url = API_CONSTANT.requestById
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  shippingAdderss(payload: any): Observable<any> {
    let url = API_CONSTANT.shippingAdderss
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  interIntraStatus(payload: any): Observable<any> {
    let url = API_CONSTANT.interIntraStatus
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  deviceVahanList(payload: any): Observable<any> {
    let url = API_CONSTANT.deviceVahanList
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }

  generateInvoice(payload: any): Observable<any> {
    let url = API_CONSTANT.generateInvoice
    return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error))); 
  }


}
