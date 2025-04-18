import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';
import { ApiService } from '../../../../shared/http-service/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(
    private apiService : ApiService
  ) { }

  certificateList(payload: any): Observable<any> {
    let url = API_CONSTANT.certificateList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateCertificate(payload: any): Observable<any> {
    let url = API_CONSTANT.updateCertificate
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  uploadCertificate(payload: any): Observable<any> {
    let url = API_CONSTANT.uploadCertificate
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
