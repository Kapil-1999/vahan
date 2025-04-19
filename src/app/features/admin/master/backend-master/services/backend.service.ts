import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private apiService:ApiService) { }
  
  backendList(): Observable<any> {
     let url = API_CONSTANT.backendList
     return this.apiService
     .get(url)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   createBackend(payload:any): Observable<any> {
     let url = API_CONSTANT.createBackend
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   updateBackend(payload:any): Observable<any> {
     let url = API_CONSTANT.updateBackend
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }
}
