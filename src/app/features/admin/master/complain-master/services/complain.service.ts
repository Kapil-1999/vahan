import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private apiService: ApiService) { }
  
    complainList(): Observable<any> {
      let url = API_CONSTANT.complainList
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    addComplain(payload: any): Observable<any> {
      let url = API_CONSTANT.addComplain
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    updateComplain(payload: any): Observable<any> {
      let url = API_CONSTANT.updateComplain
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
}
