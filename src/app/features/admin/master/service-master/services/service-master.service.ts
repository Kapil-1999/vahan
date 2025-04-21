import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class ServiceMasterService {

  constructor(private apiService: ApiService) { }
  
  serviceList(): Observable<any> {
    let url = API_CONSTANT.serviceList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addService(payload: any): Observable<any> {
    let url = API_CONSTANT.createService
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateService(payload: any): Observable<any> {
    let url = API_CONSTANT.updateService
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

}
