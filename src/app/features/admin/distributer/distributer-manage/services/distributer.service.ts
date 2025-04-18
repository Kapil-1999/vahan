import { Injectable } from '@angular/core';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class DistributerService {

  constructor(private apiService:ApiService) { }

  distributerList(payload:any): Observable<any> {
     let url = API_CONSTANT.distributerList
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   createDistributer(payload:any): Observable<any> {
     let url = API_CONSTANT.createDistributer
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   updateDistributer(payload:any): Observable<any> {
     let url = API_CONSTANT.updateDistributer
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }
}
