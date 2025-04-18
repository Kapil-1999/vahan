import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApiService } from '../../../../shared/http-service/api.service';
import { API_CONSTANT } from '../../../../shared/constant/API.Constant';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private apiService: ApiService) { }

  deviceList(payload: any): Observable<any> {
    let url = API_CONSTANT.deviceList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  addDevice(payload: any): Observable<any> {
    let url = API_CONSTANT.addSingleStock
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  updateDevice(payload: any): Observable<any> {
    let url = API_CONSTANT.updateStock
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }



  modifiyDevice(payload: any): Observable<any> {
    let url = API_CONSTANT.modifydevice.replace('${iccid}',payload.iccid)
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }
}
