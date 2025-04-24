import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationService } from '../../../../../../shared/services/notification.service';

@Component({
  selector: 'app-customer-detail',
  standalone: false,
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent {
  tittle: any
  button: any
  customerForm: any
  customerValue: any
  copy: boolean = false;
  copiedCustomerName: any;
  copiedMobileNo: any;
  copiedAdharNo: any;
  copiedAddress: any;
  constructor(
    private modalService: BsModalService,
    private fb: FormBuilder,
    private clipboardService: ClipboardService,
    private NotificationService: NotificationService


  ) { }

  ngOnInit() {
    this.setInitialForm()
  }

  setInitialForm() {
    if (this.customerValue) {
      this.customerForm = this.fb.group({
        customerName: [this.customerValue?.permitHolderName, [Validators.required]],
        mobileNo: [this.customerValue?.permitHolderMobile, [Validators.required]],
        adharNo: [this.customerValue?.permitHolderAadhar, [Validators.required]],
        address: [this.customerValue?.permitHolderAddress, [Validators.required]],
      })
    }

  }

  copyContent(value: any, message: any) {
    this.clipboardService.copyFromContent(value);
    this.copy = true;
    if (value === this.customerForm?.value.customerName) {
      this.copiedCustomerName = value;
    } else if (value === this.customerForm?.value.mobileNo) {
      this.copiedMobileNo = value;
    } else if (value === this.customerForm?.value.adharNo) {
      this.copiedAdharNo = value;
    } else if (value === this.customerForm?.value.address) {
      this.copiedAddress = value;
    }

    this.NotificationService.copyAlert(`${message} Copied`);
    setTimeout(() => {
      this.copy = false;
    }, 2000);
  }

  cancel() {
    this.modalService.hide()
  }
}
