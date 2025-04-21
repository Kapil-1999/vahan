import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private apiService: ApiService) { }
   
  authorityList(): Observable<any> {
    let url = API_CONSTANT.authorityList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addAuthority(payload: any): Observable<any> {
    let url = API_CONSTANT.addAuthority
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateAuthority(payload: any): Observable<any> {
    let url = API_CONSTANT.updateAuthority
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
