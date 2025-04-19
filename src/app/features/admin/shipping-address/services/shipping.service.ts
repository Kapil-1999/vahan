import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(
    private apiService: ApiService
  ) { }
  
  shippingList(payload: any): Observable<any> {
    let url = API_CONSTANT.shippingList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addShippingAddress(payload: any): Observable<any> {
    let url = API_CONSTANT.addShippingAddress
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateShippingAddress(payload: any): Observable<any> {
    let url = API_CONSTANT.updateShippingAddress
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteShippingAddress(payload: any): Observable<any> {
    let url = API_CONSTANT.deleteShippingAddress
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
