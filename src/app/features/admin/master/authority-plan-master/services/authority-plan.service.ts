import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class AuthorityPlanService {

  constructor(private apiService: ApiService) { }

   authorityPlanList(payload:any): Observable<any> {
         let url = API_CONSTANT.authorityPlanList
         return this.apiService
           .post(url,payload)
           .pipe(catchError((error: HttpErrorResponse) => of(error)));
       }
     
       addAuthorityPlan(payload: any): Observable<any> {
         let url = API_CONSTANT.addAuthorityPlan
         return this.apiService
           .post(url, payload)
           .pipe(catchError((error: HttpErrorResponse) => of(error)));
       }
     
       updateAuthorityPlan(payload: any): Observable<any> {
         let url = API_CONSTANT.updateAuthorityPlan
         return this.apiService
           .post(url, payload)
           .pipe(catchError((error: HttpErrorResponse) => of(error)));
       }
}
