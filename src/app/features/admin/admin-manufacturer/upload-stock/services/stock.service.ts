import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private apiService : ApiService
  ) { }

  stockList(payload: any): Observable<any> {
    let url = API_CONSTANT.stockList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  };

  addSingleStock(payload : any): Observable<any> {
    let url = API_CONSTANT.addSingleStock
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addBulkStock(payload: any,formData:any): Observable<any> {
    let url = API_CONSTANT.addBulkStock.replace("${manufactureId}",payload.manufactureId).replace("${productId}",payload.productId)
    return this.apiService
      .post(url, formData)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateStock(payload: any): Observable<any> {
    let url = API_CONSTANT.updateStock
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
