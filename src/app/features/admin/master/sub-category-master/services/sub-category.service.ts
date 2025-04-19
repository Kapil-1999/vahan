import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  constructor(private apiService:ApiService) { }
     
  subCategoryList(payload:any): Observable<any> {
     let url = API_CONSTANT.subCategoryList
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   createSubCategory(payload:any): Observable<any> {
     let url = API_CONSTANT.createSubCategory
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

   updatSubCategory(payload:any): Observable<any> {
     let url = API_CONSTANT.updateSubCategory
     return this.apiService
     .post(url,payload)
     .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }

}
