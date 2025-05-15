import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private apiService: ApiService) { }

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

  updateSales(payload: any): Observable<any> {
    let url = API_CONSTANT.updateSales
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

  uploadInventory(payload: any, formData: any): Observable<any> {
    let url = API_CONSTANT.uploadInventory.replace('${uploadId}', payload.uploadId)
    return this.apiService
      .post(url, formData)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDocket(payload: any): Observable<any> {
    let url = API_CONSTANT.docketNo
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  deleteSalesList(payload: any): Observable<any> {
    let url = API_CONSTANT.deleteSalesList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  inventoryOrder(payload: any): Observable<any> {
    let url = API_CONSTANT.inventoryOrderDetail
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

 validateInventoryFile(payload: any, formData: any): Observable<any> {
    let url = API_CONSTANT.validateFile.replace('${uploadId}', payload.uploadId)
    return this.apiService
      .post(url, formData)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
