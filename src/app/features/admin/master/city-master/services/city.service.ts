import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiService: ApiService) { }

  cityList(payload: any): Observable<any> {
      let url = API_CONSTANT.cityList
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    addCity(payload: any): Observable<any> {
      let url = API_CONSTANT.addCity
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
  
    updateCity(payload: any): Observable<any> {
      let url = API_CONSTANT.updateCity
      return this.apiService
        .post(url, payload)
        .pipe(catchError((error: HttpErrorResponse) => of(error)));
    }
}
