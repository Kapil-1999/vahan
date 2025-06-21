import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class RtoService {

  constructor(private apiService: ApiService) { }
  
  rtoListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.rtoList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  createRto(payload: any): Observable<any> {
    let url = API_CONSTANT.createRto
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateRto(payload: any): Observable<any> {
    let url = API_CONSTANT.updateRto
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
