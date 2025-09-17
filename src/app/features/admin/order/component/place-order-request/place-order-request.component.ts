import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PaymentService } from '../../../../shared/services/payment.service';

@Component({
  selector: 'app-place-order-request',
  standalone: false,
  templateUrl: './place-order-request.component.html',
  styleUrl: './place-order-request.component.scss'
})
export class PlaceOrderRequestComponent {
  @Output() mapdata = new EventEmitter();

  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  config1 = {
    displayKey: "device_subcategory_name",
    height: '200px',
    search: true
  };
  productList: any;
  stateList: any;
  placeOrderForm!: FormGroup;
  planList: any;
  selectedProduct: any = null;
  userDetails: any;
  shippingList: any;
  paymentModeList: any;
  taxCalculationData: any;
  baseUrlPath: any;
  paymentDetails: any;

  constructor(
    private modalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private OrderService: OrderService,
    private notficationService: NotificationService,
    private paymentService: PaymentService
  ) {
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;
    });

    this.paymentService.paymentSuccess$.subscribe((res) => {
      this.paymentDetails = res?.body;
      this.submit(this.placeOrderForm.value);
    });
  };

  ngOnInit() {
    this.setInitialTable();
    this.getProductList();
    this.getShippingAddress()
    this.getpaymentMode();
  }

  setInitialTable() {
    this.placeOrderForm = this.fb.group({
      productId: [null, [Validators.required]],
      stateId: [{ value: '', disabled: true }],
      planId: [{ value: '', disabled: true }],
      rate: [{ value: 0, disabled: true }, [Validators.required]],
      quantity: ['0.00', [Validators.required]],
      amount: ['0.00',],
      cgst: ['0.00',],
      sgst: ['0.00',],
      igst: ['0.00',],
      tax: ['0.00',],
      billingAmount: ['0.00'],
      shippingAddress: ['', [Validators.required]],
      paymentMode: ['', [Validators.required]],
      remarks: ['', [Validators.maxLength(1000)]],
      bankName: ['', [
        Validators.maxLength(200),
        Validators.pattern(/^[A-Za-z0-9\s\.,&()-]*$/)
      ]],
      refrence_no: ['', [
        Validators.maxLength(35),
        Validators.pattern(/^[A-Z0-9-]+$/)
      ]],
      image_byte: [null]
    });


    this.placeOrderForm.get('quantity')?.valueChanges.subscribe((value: any) => {
      this.amountCalculation()
    });

    this.placeOrderForm.get('amount')?.valueChanges.subscribe((value: any) => {
      this.taxCalculation()
    });

    this.placeOrderForm.get('paymentMode')?.valueChanges.subscribe((value: any) => {
      if (value?.value == '2') {
        this.placeOrderForm.get('bankName')?.setValidators([Validators.required]);
        this.placeOrderForm.get('refrence_no')?.setValidators([Validators.required]);
        this.placeOrderForm.get('image_byte')?.setValidators([Validators.required]);
      } else {
        this.placeOrderForm.get('bankName')?.clearValidators();
        this.placeOrderForm.get('refrence_no')?.clearValidators();
        this.placeOrderForm.get('image_byte')?.clearValidators();
      }

      this.placeOrderForm.get('bankName')?.updateValueAndValidity();
      this.placeOrderForm.get('refrence_no')?.updateValueAndValidity();
      this.placeOrderForm.get('image_byte')?.updateValueAndValidity();
    });

    this.placeOrderForm.get('amount')?.disable();
    this.placeOrderForm.get('cgst')?.disable();
    this.placeOrderForm.get('sgst')?.disable();
    this.placeOrderForm.get('igst')?.disable();
    this.placeOrderForm.get('tax')?.disable();
    this.placeOrderForm.get('billingAmount')?.disable();

  }

  getProductList() {
    let payload = {
      fk_device_category_id: 0
    }
    this.OrderService.orderProductList(payload).subscribe((res: any) => {
      this.productList = res?.body?.result

    })
  }

  getShippingAddress() {
    let payload = {
      "empId": this.userDetails?.Id
    }
    this.OrderService.shippingAdderss(payload).subscribe((res: any) => {
      this.shippingList = res.body.result.map((item: any) => ({
        value: item.shipingId,
        text: item.contact_person_name
      }));
    });
  }

  getpaymentMode() {
    this.commonService.paymentMode().subscribe((res: any) => {
      this.paymentModeList = res.body || []
    });
  }

  onProductChange(event: any) {
    this.onGetTaxCalculation(event);
    if (Array.isArray(event.value)) {
      return;
    }
    this.selectedProduct = event.value;
    this.placeOrderForm.get('rate')?.enable();
    this.placeOrderForm.patchValue({
      rate: event.value?.device_price,
    });
    this.placeOrderForm.get('rate')?.disable();
    if (this.selectedProduct?.isState) {
      this.placeOrderForm.get('stateId')?.enable();
    } else {
      this.placeOrderForm.get('stateId')?.disable();
    }
    if (this.selectedProduct?.isPlan) {
      this.placeOrderForm.get('planId')?.enable();
    } else {
      this.placeOrderForm.get('planId')?.disable();
    }
    if (event.value?.isState) {
      this.getStateList();
    }
  }

  getStateList() {
    this.commonService.stateListOnDeviceType().subscribe((res: any) => {
      this.stateList = res.body || [];
    })
  }

  onChangeState(event: any) {
    if (Array.isArray(event.value)) {
      return;
    }
    this.getPlanList();
  }

  getPlanList() {
    let payload = {
      state_Id: Number(this.placeOrderForm.value.stateId?.value)
    }
    this.commonService.planBasedOnState(payload).subscribe((res: any) => {
      console.log(res);
      this.planList = res?.body
    })
  }


  onGetTaxCalculation(e: any) {
    const productId = this.placeOrderForm.get('productId')?.value;
    const shippingAddress = this.placeOrderForm.get('shippingAddress')?.value;

    if (!productId || Array.isArray(productId)) {
      this.notficationService.showInfo('Please select product for tax calculation');
      return;
    }
    if (!shippingAddress || Array.isArray(shippingAddress)) {
      this.notficationService.showInfo('Please select shipping address for tax calculation');
      return;
    }

    let payload = {
      "productId": productId?.pk_device_subcategory_id,
      "shippingId": shippingAddress?.value,
      "createdBy": Number(this.userDetails?.Id),
    }
    this.OrderService.getTaxCalculation(payload).subscribe((res: any) => {
      this.taxCalculationData = res?.body?.result;
      this.amountCalculation()

    })
  }

  amountCalculation() {
    if (this.placeOrderForm.value.shippingAddress === '') {
      this.placeOrderForm.get('shippingAddress')?.markAsTouched();
      return;
    }
    let quantity = this.placeOrderForm.get('quantity')?.value;
    this.placeOrderForm.get('rate')?.enable()
    let rate = this.placeOrderForm.get('rate')?.value || 0;
    let amount = quantity * rate;
    this.placeOrderForm.get('amount')?.enable();
    this.placeOrderForm.patchValue({
      amount: amount.toFixed(2),
    });
    this.placeOrderForm.get('rate')?.disable()
    this.placeOrderForm.get('amount')?.disable();
  }

  taxCalculation() {
    let amount = this.placeOrderForm.get('amount')?.value || 0;
    let cgst = this.taxCalculationData?.cgst || 0;
    let sgst = this.taxCalculationData?.sgst || 0;
    let igst = this.taxCalculationData?.igst || 0;
    let cgstAmount = +(amount * cgst) / 100 || 0;
    let sgstAmount = +(amount * sgst) / 100 || 0;
    let igstAmount = +(amount * igst) / 100 || 0;
    let taxAmount = cgstAmount + sgstAmount + igstAmount || 0;
    let billingAmount = Number(amount) + taxAmount;

    this.placeOrderForm.get('cgst')?.enable();
    this.placeOrderForm.patchValue({
      cgst: cgstAmount.toFixed(2),
    });
    this.placeOrderForm.get('cgst')?.disable();

    this.placeOrderForm.get('sgst')?.enable();
    this.placeOrderForm.patchValue({
      sgst: sgstAmount.toFixed(2),
    });
    this.placeOrderForm.get('sgst')?.disable();

    this.placeOrderForm.get('igst')?.enable();
    this.placeOrderForm.patchValue({
      igst: igstAmount.toFixed(2),
    });
    this.placeOrderForm.get('igst')?.disable();

    this.placeOrderForm.get('tax')?.enable();
    this.placeOrderForm.patchValue({
      tax: taxAmount.toFixed(2),
    });
    this.placeOrderForm.get('tax')?.disable();

    this.placeOrderForm.get('billingAmount')?.enable();
    this.placeOrderForm.patchValue({
      billingAmount: billingAmount.toFixed(2),
    });
    this.placeOrderForm.get('billingAmount')?.disable();
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

  submit(formValue: any) {
    if (this.placeOrderForm.invalid) {
      this.placeOrderForm.markAllAsTouched();
      return;
    };

    const updatedFormValue = this.placeOrderForm.getRawValue();
    if (Number(updatedFormValue?.billingAmount) === 0) {
      this.notficationService.showInfo('Please calculate taxes first');
      return;
    }

    let payload = {
      "fk_subcategory_id": Number(formValue.productId?.pk_device_subcategory_id),
      "fk_plan_id": 0,
      "fk_state_id": 0,
      "request_qty": updatedFormValue.quantity,
      "remarks": formValue.remarks,
      "created_by": Number(this.userDetails?.Id),
      "fk_shiping_id": formValue.shippingAddress?.value,
      "fk_payment_mode_id": formValue.paymentMode?.value,
      "item_rate": Number(updatedFormValue.rate),
      "amount": +Number(updatedFormValue.amount).toFixed(2),
      "cgst": +Number(updatedFormValue.cgst).toFixed(2),
      "sgst": +Number(updatedFormValue.sgst).toFixed(2),
      "igst": +Number(updatedFormValue.igst).toFixed(2),
      "tax": +Number(updatedFormValue.tax).toFixed(2),
      "net_amount": +Number(updatedFormValue.billingAmount).toFixed(2),
      "rounding": 0,
      "bill_amount": +Number(updatedFormValue.billingAmount).toFixed(2),
      "paymentInfo": {
        "payment_mode_id": Number(formValue.paymentMode?.value),
        "payment_amount": +Number(updatedFormValue.billingAmount).toFixed(2),
        "customer_request_id": Number(this.userDetails?.Id),
        "bank_name": formValue.bankName,
        "refrence_no": formValue.refrence_no,
        "image_file": "",
        "image_byte": this.baseUrlPath,
        "request_status": this.paymentDetails?.result.pStatus || "",
        "request_responce": this.paymentDetails?.actionResponse || "",
        "provider_order_id": "",
        "payment_id": this.paymentDetails?.result?.id || "",
        "signature_id": ""
      }
    }

    this.OrderService.generateOrder(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.modalService.hide();
        this.mapdata.emit();
        this.notficationService.showSuccess(res?.body?.actionResponse);
      } else {
        this.notficationService.showError(res?.body?.actionResponse);
      }
    })
  }

  cancel() {
    this.modalService.hide();
  }

  onPayment() {
    if (this.placeOrderForm.invalid) {
      this.placeOrderForm.markAllAsTouched();
      return;
    };
    const updatedFormValue = this.placeOrderForm.getRawValue();
    if (Number(updatedFormValue?.billingAmount) === 0) {
      this.notficationService.showInfo('Amount will be greater then Zero');
      return;
    }
    this.paymentService.initiatePayment(updatedFormValue?.billingAmount);
  };

  onReferenceInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toUpperCase().trim();
    this.placeOrderForm.get('refrence_no')?.setValue(value, { emitEvent: false });
  }
}
