import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/app.reducer';
import { setToken, setUser } from '../../../../core/app.action';
import { CommonService } from '../../services/common.service';
import { NotificationService } from '../../services/notification.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private store: Store<AppState>,
    private commonService: CommonService,
    private NotificationService: NotificationService,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {    
   let token:any =  this.storageService.getToken();   
   if(token){
    this.router.navigate(['/admin/manufacturer/manufacturer-list']);
   } else {
    this.router.navigate(['/login']);
   }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(e: any, formvalue: any) {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    e.preventDefault();
    let payload = {
      "userName": formvalue.phone,
      "password": formvalue.password
    }
    this.loginService.login(payload).subscribe((res: any) => {
      this.isLoading = false;
      if (res?.body?.statusCode == 200) {
        this.store.dispatch(setToken({ token: res?.body?.result }));
        let token = res?.body?.result;
        const decodedToken = this.commonService.decodeToken(token);
        this.store.dispatch(setUser({ user: decodedToken }));
        this.NotificationService.successAlert('Login Successfully');
        setTimeout(() => {   
          if(decodedToken.RoleId == '2') {
            this.router.navigate(['/admin/orders/order-details']);
          } else {
            this.router.navigate(['/admin/manufacturer/manufacturer-list']);
          } 

        }, 2000);
      } else {
        this.NotificationService.errorAlert(res?.body?.actionResponse);
      }
    })
  }
}
