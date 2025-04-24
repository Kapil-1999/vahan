import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { ApiService } from '../../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private apiService: ApiService) { }

  supportList(payload: any): Observable<any> {
      let url = API_CONSTANT.supportList
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    addSupport(payload: any): Observable<any> {
      let url = API_CONSTANT.addSupport
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    updateSupport(payload: any): Observable<any> {
      let url = API_CONSTANT.updateSupport
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
}
