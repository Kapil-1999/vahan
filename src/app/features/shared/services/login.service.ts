import { Injectable } from '@angular/core';
import { API_CONSTANT } from '../constant/API.Constant';
import { ApiService } from '../http-service/api.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private apiService: ApiService,
  ) { 
  }

  login(payload: any): any {
    let url = API_CONSTANT.login;
    return this.apiService.post(url, payload)
    .pipe(catchError((error: HttpErrorResponse) => of(error)));;
  }
}
