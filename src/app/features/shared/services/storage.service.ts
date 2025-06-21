import { Injectable } from '@angular/core';
import { AppState } from '../../../core/app.reducer';
import { Store } from '@ngrx/store';
import { selectToken, selectUser } from '../../../core/app.selectors';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private store : Store<AppState>
  ) { }

  getUserToken() {
    this.store.select(selectToken).subscribe((res:any) => {
      return res      
    })
  }

  getToken(): string | null {
    return localStorage.getItem('vahan_token'); 
  }

  getUser() {
    this.store.select(selectUser).subscribe((res:any) => {
      console.log(res);
      
      return res      
    })
  }
  
}
