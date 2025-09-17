import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MyRequestService } from '../../services/my-request.service';
import { PaymentService } from '../../../../shared/services/payment.service';

@Component({
  selector: 'app-request-payment',
  standalone: false,
  templateUrl: './request-payment.component.html',
  styleUrl: './request-payment.component.scss'
})
export class RequestPaymentComponent {
  @Output() mapdata = new EventEmitter();

  isLoading: any;
  columns: any;
  editData: any;
  vahanDeviceList: any;
  invoiceForm!: FormGroup;
  serviceList: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  paymentModeList: any;
  baseUrlPath: any;
  userDetails: any;
  paymentDetails: any;
  constructor(
    private bsmodalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private notficationService: NotificationService,
    private requestService: MyRequestService,
    private paymentService: PaymentService
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    })

    this.paymentService.paymentSuccess$.subscribe((res) => {
      this.paymentDetails = res?.body;
      console.log(this.paymentDetails);
      
      this.submit(this.invoiceForm.value);
    });
  };

  ngOnInit() {
    this.setInialTable();
    this.setInitialform()
    this.vahanDeviceList = this.editData?.itemList;
    this.getServiceList();
    this.getpaymentMode()
  };

  getpaymentMode() {
    this.commonService.paymentMode().subscribe((res: any) => {
      this.paymentModeList = res.body || []
    });
  }

  setInitialform() {
    this.invoiceForm = this.fb.group({
      service_id: [null, [Validators.required]],
      rate: [{ value: "0.00", disabled: true }],
      quantity: [{ value: "0", disabled: true }],
      amount: [{ value: "0.00", disabled: true }],
      igstPer: [{ value: 18, disabled: true }],
      cgstPer: [{ value: 9, disabled: true }],
      sgstPer: [{ value: 9, disabled: true }],
      cgst: [{ value: '0.00', disabled: true }],
      sgst: [{ value: '0.00', disabled: true }],
      igst: [{ value: '0.00', disabled: true }],
      tax: [{ value: '0.00', disabled: true }],
      netamount: [{ value: '0.00', disabled: true }],
      billingAmount: [{ value: '0.00', disabled: true }],
      gstType: [{ value: '1', disabled: true }],
      remarks: [''],
      paymentMode: [null, [Validators.required]],
      bankName: ['',  [
        Validators.maxLength(200),
        Validators.pattern(/^[A-Za-z0-9\s\.,&()-]*$/)
      ]],
      refrence_no: ['', [
        Validators.maxLength(35),
        Validators.pattern(/^[A-Z0-9-]+$/)
      ]],
      image_byte: [null]
    })


    if (this.editData?.bill_amount > 0) {
      this.invoiceForm.patchValue({
        rate: this.editData?.item_rate,
        quantity: this.editData?.net_request,
        amount: this.editData?.amount,
        igstPer: this.editData?.igst_per,
        cgstPer: this.editData?.cgst_per,
        sgstPer: this.editData?.sgst_per,
        cgst: this.editData?.cgst,
        sgst: this.editData?.sgst,
        igst: this.editData?.igst,
        tax: this.editData?.tax,
        netamount: this.editData?.net_amount,
        billingAmount: this.editData?.bill_amount,
        remarks: this.editData?.invoice_remarks
      })
    }

    this.invoiceForm.get('paymentMode')?.valueChanges.subscribe((value: any) => {
      if (value?.value == '2') {
        this.invoiceForm.get('bankName')?.setValidators([Validators.required]);
        this.invoiceForm.get('refrence_no')?.setValidators([Validators.required]);
        this.invoiceForm.get('image_byte')?.setValidators([Validators.required]);
      } else {
        this.invoiceForm.get('bankName')?.clearValidators();
        this.invoiceForm.get('refrence_no')?.clearValidators();
        this.invoiceForm.get('image_byte')?.clearValidators();
      }

      this.invoiceForm.get('bankName')?.updateValueAndValidity();
      this.invoiceForm.get('refrence_no')?.updateValueAndValidity();
      this.invoiceForm.get('image_byte')?.updateValueAndValidity();
    });
  }

  setInialTable() {
    this.columns = [
      { key: 'IMEI', title: 'IMEI' },
      { key: 'UID', title: 'UID' },
      { key: 'ICCID', title: 'ICCID' },
    ];
  };

  getServiceList() {
    this.commonService.serviceddList().subscribe((res: any) => {
      this.serviceList = res?.body || [];
      if (this.editData?.fk_service_id) {
        let id = this.serviceList.find((val: any) => val.value == this.editData?.fk_service_id);
        this.invoiceForm.patchValue({
          service_id: id
        })
      }
    })
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        this.baseUrlPath = base64String;
      };
      reader.readAsDataURL(file);
    }
  }


  submit(formvalue: any) {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    };
    const updatedFormValue = this.invoiceForm.getRawValue();
    if (Number(updatedFormValue?.billingAmount) === 0) {
      this.notficationService.showInfo('Please amount should be greater than 0');
      return;
    }

    let payload = {
      "pk_service_id": this.editData?.pk_device_request_id,
      "request_qty": updatedFormValue.quantity,
      "remarks": formvalue?.remarks,
      "created_by": Number(this.userDetails?.Id) || 0,
      "fk_payment_mode_id": Number(formvalue.paymentMode?.value),
      "item_rate": Number(updatedFormValue.rate),
      "amount": +Number(updatedFormValue.amount).toFixed(2),
      "cgst": +Number(updatedFormValue.cgst).toFixed(2),
      "sgst": +Number(updatedFormValue.sgst).toFixed(2),
      "igst": +Number(updatedFormValue.igst).toFixed(2),
      "tax": +Number(updatedFormValue.tax).toFixed(2),
      "net_amount": +Number(updatedFormValue.netamount).toFixed(2),
      "rounding": 0,
      "bill_amount": +Number(updatedFormValue.billingAmount).toFixed(2),
      "paymentInfo": {
        "payment_mode_id": Number(formvalue.paymentMode?.value),
        "payment_amount": +Number(updatedFormValue.billingAmount).toFixed(2),
        "customer_request_id": Number(this.userDetails?.Id),
        "bank_name": formvalue.bankName,
        "refrence_no": formvalue.refrence_no,
        "image_file": "",
        "image_byte": this.baseUrlPath,
        "request_status": this.paymentDetails?.result.pStatus || "",
        "request_responce": this.paymentDetails?.actionResponse || "",
        "provider_order_id": "",
        "payment_id": this.paymentDetails?.result?.id || "",
        "signature_id": ""
      }
    }
    this.requestService.generateServicePayment(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.bsmodalService.hide();
        this.mapdata.emit();
        this.notficationService.showSuccess(res?.body?.actionResponse);
      } else {
        this.notficationService.showError(res?.body?.actionResponse);
      }

    })
  }

  onPayment() {
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    };
    const updatedFormValue = this.invoiceForm.getRawValue();
    if(Number(updatedFormValue?.billingAmount) === 0) {
      this.notficationService.showInfo('Amount will be greater then Zero');
      return; 
    }
    this.paymentService.initiatePayment(updatedFormValue?.billingAmount); 
  }

  cancel(e: any) {
    e.preventDefault();
    this.bsmodalService.hide();
  }

   onReferenceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase().trim();
    this.invoiceForm.get('refrence_no')?.setValue(value, { emitEvent: false });
  }
}
