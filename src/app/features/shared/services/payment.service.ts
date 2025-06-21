import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_CONSTANT } from '../constant/API.Constant';
import { Subject } from 'rxjs';
import { ApiService } from '../http-service/api.service';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  userDetails: any;
  private readonly auth = {
    key: 'rzp_live_USY4ky5XEWsEpz',
    secret: 'DYbYxKf4GD1TtBl20mnNhxJG'
  };
  private paymentSuccessSubject = new Subject<any>();
  paymentSuccess$ = this.paymentSuccessSubject.asObservable();

  constructor(
    private commonService: CommonService,
    private apiService: ApiService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  initiatePayment(amount: number, currency: string = 'INR') {
    const options = {
      key: this.auth.key, 
      amount: amount * 100,
      currency: currency,
      name: 'Acute Communication',
      description: 'Payment for your place order',
      image: this.userDetails?.ProfileImage,
      order_id: '', 
      handler: (response: any) => {
        this.userPaymentDetails(response.razorpay_payment_id);
      },
      prefill: {
        name: this.userDetails?.EmployeeName,
        email: this.userDetails?.Email,
        contact: this.userDetails?.Contact
      },
      notes: {
        address: 'Customer Address'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  userPaymentDetails(id:any) {
    const url = API_CONSTANT.updateRazorPaymentAsync;
    let payload = {
      "payment_id": id
    }
    return this.apiService.post(url, payload).subscribe((res: any) => {
      console.log(res);
      this.paymentSuccessSubject.next(res); 
    });
  }
}