import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminManufacturerService {

  constructor(
    private apiService: ApiService
  ) { }

  adminManufacturerList(payload: any): Observable<any> {
    let url = API_CONSTANT.adminManufacturerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createManufacturer(payload: any): Observable<any> {
    let url = API_CONSTANT.createManufacture
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateManufacture(payload: any): Observable<any> {
    let url = API_CONSTANT.updateManufacture
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
