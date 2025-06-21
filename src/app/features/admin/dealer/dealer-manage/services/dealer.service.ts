import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class DealerService {

  constructor(private apiService: ApiService) { }

  dealerListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.dealerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createDealer(payload: any): Observable<any> {
    let url = API_CONSTANT.createDealer
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDealer(payload: any): Observable<any> {
    let url = API_CONSTANT.updateDealer
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
