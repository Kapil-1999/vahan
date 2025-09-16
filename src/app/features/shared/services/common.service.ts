import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ApiService } from '../http-service/api.service';
import { API_CONSTANT } from '../constant/API.Constant';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/app.reducer';
import { selectUser } from '../../../core/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>
  ) {

  }

  getUserDetails(): Observable<any> {
    return this.store.select(selectUser);
  }

  manufacturerList(payload: any): Observable<any> {
    let url = API_CONSTANT.adminManufacturerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateDropdownList() {
    let url = API_CONSTANT.stateDropdown
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  stateListOnDeviceType() {
    let url = API_CONSTANT.stateListOnDeviceType
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  planBasedOnState(payload: any) {
    let url = API_CONSTANT.planBasedOnState
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  cityDropdown(payload: any): Observable<any> {
    let url = API_CONSTANT.cityDropdown
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }


  createState(payload: any): Observable<any> {
    let url = API_CONSTANT.createState
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

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  productList(): Observable<any> {
    let url = API_CONSTANT.productList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  authorityList(): Observable<any> {
    let url = API_CONSTANT.authorityList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  distributerDropdown(payload: any): Observable<any> {
    let url = API_CONSTANT.distributerDropdown
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  dealerListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.dealerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  managerList(payload: any): Observable<any> {
    let url = API_CONSTANT.managerList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  categoryList(): Observable<any> {
    let url = API_CONSTANT.categoryList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  getGstList(): Observable<any> {
    let url = API_CONSTANT.gstList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  headtList(payload: any): Observable<any> {
    let url = API_CONSTANT.headListDD
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  vehicleTypeDropdown() {
    let url = API_CONSTANT.vehicleType
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  backendList(): Observable<any> {
    let url = API_CONSTANT.backendList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  rtoListdetail(payload: any): Observable<any> {
    let url = API_CONSTANT.rtoList
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  paymentMode(): Observable<any> {
    let url = API_CONSTANT.paymentMode
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  paymentStatusList(): Observable<any> {
    let url = API_CONSTANT.paymentStatusList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  commonDealer(payload: any): Observable<any> {
    let url = API_CONSTANT.commonDealer
    return this.apiService
      .post(url, payload)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  serviceddList(): Observable<any> {
    let url = API_CONSTANT.serviceddList
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  refrenceListDD(): Observable<any> {
    let url = API_CONSTANT.refrenceTypeDD
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  priorityListDD(): Observable<any> {
    let url = API_CONSTANT.priorityListDD
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  }

  complainCategoryListDD(): Observable<any> {
    let url = API_CONSTANT.complainCategoryListDD
    return this.apiService
      .get(url)
      .pipe(catchError((error: HttpErrorResponse) => of(error)));
  };

  formatPan(value: any) {
    value = value.toUpperCase();

    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    if (value.length <= 5) {
      value = value.replace(/[^A-Z]/g, '');
    } else if (value.length <= 9) {
      let firstPart = value.substring(0, 5).replace(/[^A-Z]/g, '');
      let numberPart = value.substring(5).replace(/[^0-9]/g, '');
      value = firstPart + numberPart;
      if (value.length > 9) {
        value = value.substring(0, 9);
      }
    } else {
      let firstPart = value.substring(0, 5).replace(/[^A-Z]/g, '');
      let numberPart = value.substring(5, 9).replace(/[^0-9]/g, '');
      let lastChar = value.substring(9).replace(/[^A-Z]/g, '');
      value = firstPart + numberPart + lastChar;
    }

    return value
  };

  formatGstin(value: string): string {
    value = value.toUpperCase();

    if (value.length > 15) {
      value = value.substring(0, 15);
    }

    if (value.length <= 2) {
      value = value.replace(/[^0-9]/g, '');
    }
    else if (value.length <= 12) {
      let stateCode = value.substring(0, 2).replace(/[^0-9]/g, '');

      let panPart = value.substring(2);

      let first5 = panPart.substring(0, 5).replace(/[^A-Z]/g, '');
      let next4 = panPart.substring(5, 9).replace(/[^0-9]/g, '');
      let last1 = panPart.substring(9, 10).replace(/[^A-Z]/g, '');

      value = stateCode + first5 + next4 + last1;
    }
    else {
      let first12 = value.substring(0, 12);
      let entityCode = value.substring(12, 13).replace(/[^A-Z0-9]/g, '');
      let defaultZ = 'Z';
      let checkSum = value.substring(14, 15).replace(/[^A-Z0-9]/g, '');

      value = first12 + entityCode + defaultZ + checkSum;
    }

    return value;
  };

  formatEngineNo(value: string): string {
    value = value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, ''); // Remove invalid chars
    let formatted = '';

    // First 2 letters
    if (value.length > 0) {
      let letters = value.substring(0, Math.min(2, value.length)).replace(/[^A-Z]/g, '');
      formatted += letters;
    }

    // Next up to 5 digits
    if (value.length > 2) {
      let digits = value.substring(2, Math.min(7, value.length)).replace(/[^0-9]/g, '');
      formatted += digits;
    }

    // Remaining characters (alphanumeric)
    if (value.length > 7) {
      let rest = value.substring(7, 20).replace(/[^A-Z0-9]/g, '');
      formatted += rest;
    }

    // Limit total length to 20
    if (formatted.length > 20) {
      formatted = formatted.substring(0, 20);
    }

    return formatted;
  }

  formatVehicleNo(value: string): string {
    value = value.toUpperCase();
    value = value.replace(/[^A-Z0-9]/g, '');

    let formatted = '';

    if (value.length >= 1) {
      formatted += value.substring(0, Math.min(2, value.length)).replace(/[^A-Z]/g, '');
    }

    if (value.length > 2) {
      let rtoPart = value.substring(2);
      let rtoMatch = rtoPart.match(/^\d{1,2}/);
      if (rtoMatch) {
        formatted += rtoMatch[0];
      }
    }

    if (value.length > 4) {
      let seriesStart = 2 + formatted.substring(2).length;
      let remaining = value.substring(seriesStart);
      let seriesMatch = remaining.match(/^[A-Z]{1,2}/);
      if (seriesMatch) {
        formatted += seriesMatch[0];
      }
    }
    let lastDigitsStart = formatted.length;
    if (value.length > lastDigitsStart) {
      let remaining = value.substring(lastDigitsStart);
      let digitsMatch = remaining.match(/^\d{1,4}/);
      if (digitsMatch) {
        formatted += digitsMatch[0];
      }
    }

    return formatted;
  };

  formatChassisNo(value: string): string {
  if (!value) return '';

  value = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

  let formatted = '';

  if (value.length > 0) {
    formatted += value.substring(0, Math.min(3, value.length)).replace(/[^A-Z]/g, '');
  }

  if (value.length > 3) {
    let numbersPart = value.substring(3, 7).replace(/[^0-9]/g, '');
    formatted += numbersPart;
  }

  if (value.length > 7) {
    let rest = value.substring(7, 17).replace(/[^A-Z0-9]/g, '');
    formatted += rest;
  }

  return formatted;
}




}
