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
}
