import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private apiService:ApiService) { }

  salesList(payload: any): Observable<any> {
    let url = API_CONSTANT.salesList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createSales(payload: any): Observable<any> {
    let url = API_CONSTANT.createSales
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deviceBalance(payload: any): Observable<any> {
    let url = API_CONSTANT.deviceBalance
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
