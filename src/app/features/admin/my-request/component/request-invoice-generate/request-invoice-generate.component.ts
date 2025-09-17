import { Component, EventEmitter, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { NotificationService } from '../../../../shared/services/notification.service';
import { MyRequestService } from '../../services/my-request.service';

@Component({
  selector: 'app-request-invoice-generate',
  standalone: false,
  templateUrl: './request-invoice-generate.component.html',
  styleUrl: './request-invoice-generate.component.scss'
})
export class RequestInvoiceGenerateComponent {
  @Output() mapdata = new EventEmitter();

  columns: any;
  isLoading: boolean = false;
  vahanDeviceList: any;
  editData: any;
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  };
  serviceList: any;
  invoiceForm!: FormGroup;


  constructor(
    private bsmodalService: BsModalService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private notficationService: NotificationService,
    private requestService: MyRequestService
  ) { };

  ngOnInit() {
    this.setInialTable();
    this.setInitialform()
    this.vahanDeviceList = this.editData?.itemList;
    this.getServiceList();
  }

  setInitialform() {
    this.invoiceForm = this.fb.group({
      service_id: [null, [Validators.required]],
      rate: ['0.00'],
      refrenceNo: ['', [Validators.maxLength(35),
      Validators.pattern(/^[A-Z0-9-]+$/)
      ]],
      quantity: ['0'],
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
      gstType: ["1"],
      remarks: ['']
    })

    this.invoiceForm.get('rate')?.valueChanges.subscribe((val: any) => {
      this.calculateAmount();
    })
    this.invoiceForm.get('quantity')?.valueChanges.subscribe((val: any) => {
      this.calculateAmount();
    });

    this.invoiceForm.get('gstType')?.valueChanges.pipe(
      startWith(this.invoiceForm.get('gstType')?.value)
    ).subscribe((val: any) => {
      this.onGstTypeChange(val);
    })

    if (this.editData?.bill_amount > 0) {
      this.invoiceForm.patchValue({
        rate: this.editData?.item_rate,
        refrenceNo: this.editData?.tally_refrence_no,
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

  calculateAmount() {
    let rate = this.invoiceForm.get('rate')?.value;
    let quantity = this.invoiceForm.get('quantity')?.value;
    let amount = rate * quantity;
    this.invoiceForm.get('amount')?.enable();
    this.invoiceForm.patchValue({
      amount: amount.toFixed(2) || 0
    })
    this.invoiceForm.get('amount')?.disable();
    this.calculateTax('')
  }

  onGstTypeChange(event: any) {
    const gstType = event;
    if (gstType === '1') {
      this.invoiceForm.get('igst')?.enable();
      this.invoiceForm.get('igstPer')?.enable();
      this.invoiceForm.get('cgstPer')?.disable();
      this.invoiceForm.get('sgstPer')?.disable();
      this.invoiceForm.get('cgst')?.disable();
      this.invoiceForm.get('sgst')?.disable();

      this.invoiceForm.patchValue({
        cgstPer: 9,
        sgstPer: 9,
        cgst: '0.00',
        sgst: '0.00'
      });
    } else {
      this.invoiceForm.get('cgstPer')?.enable();
      this.invoiceForm.get('sgstPer')?.enable();
      this.invoiceForm.get('cgst')?.enable();
      this.invoiceForm.get('sgst')?.enable();
      this.invoiceForm.get('igst')?.disable();
      this.invoiceForm.get('igstPer')?.disable();

      this.invoiceForm.patchValue({
        igstPer: 18,
        igst: '0.00'
      });
    }
    this.calculateTax('')

  }

  calculateTax(e: any) {
    if (this.invoiceForm.value.gstType === '1') {
      this.invoiceForm.get('amount')?.enable();
      this.invoiceForm.get('igst')?.enable();
      this.invoiceForm.get('igstPer')?.enable();
      let igsctTax = this.invoiceForm.get('amount')?.value * this.invoiceForm.get('igstPer')?.value / 100;
      this.invoiceForm.patchValue({
        igst: igsctTax.toFixed(2) || 0,
      });
      this.invoiceForm.get('amount')?.disable();
    } else {
      this.invoiceForm.get('amount')?.enable();
      this.invoiceForm.get('cgst')?.enable();
      this.invoiceForm.get('sgst')?.enable();
      this.invoiceForm.get('cgstPer')?.enable();
      this.invoiceForm.get('sgstPer')?.enable();
      let cgstTax = this.invoiceForm.get('amount')?.value * this.invoiceForm.get('cgstPer')?.value / 100;
      let sgstTax = this.invoiceForm.get('amount')?.value * this.invoiceForm.get('sgstPer')?.value / 100;
      this.invoiceForm.patchValue({
        cgst: cgstTax.toFixed(2) || 0,
        sgst: sgstTax.toFixed(2) || 0
      })
      this.invoiceForm.get('amount')?.disable();
    };
    this.invoiceForm.get('igstPer')?.disable();
    this.invoiceForm.get('cgstPer')?.disable();
    this.invoiceForm.get('sgstPer')?.disable();
    this.invoiceForm.get('cgst')?.disable();
    this.invoiceForm.get('sgst')?.disable();
    this.calculateTotalTax();
  }

  calculateTotalTax() {
    let totalTax = Number(this.invoiceForm.get('cgst')?.value) + Number(this.invoiceForm.get('sgst')?.value) + Number(this.invoiceForm.get('igst')?.value);
    this.invoiceForm.patchValue({
      tax: totalTax.toFixed(2) || 0
    });
    this.invoiceForm.get('igst')?.disable();
    this.calculateNetAmount();
  }

  calculateNetAmount() {
    let netAmount = Number(this.invoiceForm.get('amount')?.value) + Number(this.invoiceForm.get('tax')?.value);
    this.invoiceForm.patchValue({
      netamount: netAmount.toFixed(2) || 0
    })
    this.calculateBillingAmount();
  }

  calculateBillingAmount() {
    let billingAmount = Number(this.invoiceForm.get('netamount')?.value);
    this.invoiceForm.patchValue({
      billingAmount: Math.round(billingAmount) || 0
    })
  }

  submit(formvalue: any, e: any) {
    e.preventDefault();
    if (this.invoiceForm.invalid) {
      this.invoiceForm.markAllAsTouched();
      return;
    };
    const updatedFormValue = this.invoiceForm.getRawValue();
    if (Number(updatedFormValue?.billingAmount) === 0) {
      this.notficationService.showInfo('Please Billing Amount Should be greater than 0');
      return;
    }

    let payload = {
      "pk_device_request_id": this.editData?.pk_device_request_id,
      "fk_service_id": formvalue?.service_id ? Number(formvalue?.service_id?.value) : 0,
      "fk_client_id": Number(this.editData?.fk_client_id),
      "invoice_request": Number(updatedFormValue?.quantity),
      "item_rate": Number(updatedFormValue?.rate),
      "amount": Number(updatedFormValue?.amount),
      "cgst": Number(updatedFormValue?.cgst),
      "sgst": Number(updatedFormValue?.sgst),
      "igst": Number(updatedFormValue?.igst),
      "tax": Number(updatedFormValue?.tax),
      "net_amount": Number(updatedFormValue?.netamount),
      "rounding": 0,
      "bill_amount": Number(updatedFormValue?.billingAmount),
      "invoice_remarks": formvalue?.remarks,
      "cgst_per": Number(updatedFormValue?.cgstPer),
      "sgst_per": Number(updatedFormValue?.sgstPer),
      "igst_per": Number(updatedFormValue?.igstPer),
      "isIntraGST": formvalue?.gstType == "1" ? 1 : 0,
      "tally_refrence_no": formvalue?.refrenceNo
    }
    this.requestService.generateServiceInvoice(payload).subscribe((res: any) => {
      if (res?.body?.statusCode == 200) {
        this.bsmodalService.hide();
        this.mapdata.emit();
        this.notficationService.showSuccess(res?.body?.actionResponse);
      } else {
        this.notficationService.showError(res?.body?.actionResponse);
      }
    })
  }

  cancel(e: any) {
    e.preventDefault();
    this.bsmodalService.hide();
  }
}
