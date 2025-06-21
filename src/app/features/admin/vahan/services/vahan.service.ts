import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';
import { ApiService } from '../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VahanService {

  constructor(
    private apiService: ApiService
  ) { }
  
  vahanList(payload: any): Observable<any> {
    let url = API_CONSTANT.vahanList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vahanSubList(payload: any): Observable<any> {
    let url = API_CONSTANT.vahanSubList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
