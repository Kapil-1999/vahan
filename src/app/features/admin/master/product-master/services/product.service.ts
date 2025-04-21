import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private apiService: ApiService) { }
 
   productList(): Observable<any> {
     let url = API_CONSTANT.productList
     return this.apiService
       .get(url)
       .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }
 
   addProduct(payload: any): Observable<any> {
     let url = API_CONSTANT.addProduct
     return this.apiService
       .post(url, payload)
       .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }
 
   updateProduct(payload: any): Observable<any> {
     let url = API_CONSTANT.updateProduct
     return this.apiService
       .post(url, payload)
       .pipe(catchError((error: HttpErrorResponse) => of(error)));
   }
}
