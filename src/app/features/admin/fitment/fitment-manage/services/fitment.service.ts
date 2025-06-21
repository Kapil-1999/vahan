import { Injectable } from '@angular/core';
import { ApiService } from '../../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class FitmentService {

  constructor(private apiService:ApiService) { }

  activationDetail(payload: any): Observable<any> {
    let url = API_CONSTANT.activationDetail
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  modifyActivation(payload: any): Observable<any> {
   let url = API_CONSTANT.updateActivation
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 activationList(payload: any): Observable<any> {
   let url = API_CONSTANT.activationList
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 updateMisDetail(payload: any): Observable<any> {
   let url = API_CONSTANT.updateMis
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 updateSimDetail(payload: any): Observable<any> {
   let url = API_CONSTANT.updateSim
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
 updateStatus(payload: any): Observable<any> {
   let url = API_CONSTANT.updateStatus
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 uploadCertificate(payload: any): Observable<any> {
   let url = API_CONSTANT.certificatedata
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }

 deleteList(payload: any): Observable<any> {
   let url = API_CONSTANT.deleteListData
   return this.apiService
     .post(url, payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
 }
}
