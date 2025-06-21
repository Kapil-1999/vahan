import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class MyRequestService {
  constructor(
    private apiService: ApiService
  ) { }

  myReuesetData(payload: any): Observable<any> {
    let url = API_CONSTANT.getServiceDashboardData
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  requestDeviceList(payload: any): Observable<any> {
    let url = API_CONSTANT.requestDeviceList
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  generateRequest(payload: any): Observable<any> {
    let url = API_CONSTANT.generateRequest
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  generateServiceInvoice(payload: any): Observable<any> {
    let url = API_CONSTANT.generateServiceInvoice
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  generateServicePayment(payload: any): Observable<any> {
    let url = API_CONSTANT.generateServicePayment
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  UpdateRequestStatus(payload: any): Observable<any> {
    let url = API_CONSTANT.updateRequestStatus
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  orderRequestHistory(payload: any): Observable<any> {
    let url = API_CONSTANT.orderRequestHistory
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  paymentDetails(payload: any): Observable<any> {
    let url = API_CONSTANT.paymentRequestDetails
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  verifyRequestPaymentStatus(payload: any): Observable<any> {
    let url = API_CONSTANT.verifyRequestPayment
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
