import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { ApiService } from '../../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class HsnService {

  constructor(private apiService: ApiService) { }

  hsnList(): Observable<any> {
      let url = API_CONSTANT.hsnList
      return this.apiService
        .get(url)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    addHsn(payload: any): Observable<any> {
      let url = API_CONSTANT.addHsn
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    updateHsn(payload: any): Observable<any> {
      let url = API_CONSTANT.updateHsn
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
}
