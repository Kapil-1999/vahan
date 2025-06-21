import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { API_CONSTANT } from '../constant/API.Constant';
import { ApiService } from '../http-service/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(
     private apiService : ApiService
   ) { }

   userDetail(payload: any): Observable<any> {
    let url = API_CONSTANT.userProfileDetail
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateUserProfile(payload: any): Observable<any> {
    let url = API_CONSTANT.updateUser
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateUserProfileImage(payload: any): Observable<any> {
    let url = API_CONSTANT.updateUserImage
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  sendEmailOtp(payload: any): Observable<any> {
    let url = API_CONSTANT.sendEmailOtp
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  sendMobileOtp(payload: any): Observable<any> {
    let url = API_CONSTANT.sendMobileOtp
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  veryfyEmailOtp(payload: any): Observable<any> {
    let url = API_CONSTANT.veryEmailMobile
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
