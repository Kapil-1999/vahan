import { Injectable } from '@angular/core';
import { ApiService } from '../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class MycomplainService {

  constructor(private apiService:ApiService) { }

  myComplainData(payload: any): Observable<any> {
    let url = API_CONSTANT.getComplainDashboard
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  newComplainRequest(payload: any): Observable<any> {
    let url = API_CONSTANT.newComplainRequest
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  supportTeamList(payload: any): Observable<any> {
    let url = API_CONSTANT.getSupportTeamList
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  assignComplain(payload: any): Observable<any> {
    let url = API_CONSTANT.assignComplain
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  userComplainList(payload: any): Observable<any> {
    let url = API_CONSTANT.userComplainList
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  responseComplain(payload: any): Observable<any> {
    let url = API_CONSTANT.responseComplain
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  oldComplainList(payload: any): Observable<any> {
    let url = API_CONSTANT.oldComplainList
    return this.apiService
   .post(url, payload)
   .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
