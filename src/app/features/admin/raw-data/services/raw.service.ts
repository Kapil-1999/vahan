import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../shared/constant/API.Constant';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../../shared/http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class RawService {

  constructor(
    private apiService: ApiService,
  ) { };

  rawData(payload: any): Observable<any> {
    let url = API_CONSTANT.rawData
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
