import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { VahanDeviceDropdownComponent } from '../vahan-device-dropdown/vahan-device-dropdown.component';
import { NotificationService } from '../../../../shared/services/notification.service';
import { CommonService } from '../../../../shared/services/common.service';

@Component({
  selector: 'app-generate-invoice',
  standalone: false,
  templateUrl: './generate-invoice.component.html',
  styleUrl: './generate-invoice.component.scss'
})
export class GenerateInvoiceComponent {
  columns: any;
  requestId: any;
  createdBy: any;
  requestOrderDetails: any;
  orderForm!: FormGroup
  shippingList: any;
  config = {
    displayKey: "orgName",
    height: '200px',
    search: true
  };
  taxSlabData: any;
  bsModalRef!: BsModalRef;
  cgstAmt: number = 0.00;
  sgstAmt: number = 0.00;
  igstAmt: number = 0.00;
  totalTax: number = 0.00;
  netAmt: number = 0.00;
  selectDeviceData: any;
  userDetails: any;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private notificationService: NotificationService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.route.params.subscribe(params => {
      this.requestId = params['id'];
      this.createdBy = params['createdBy'];
      this.getRequestDetails();
    });
    this.commonService.getUserDetails().subscribe((res: any) => {
      this.userDetails = res;     
    })
  }

  ngOnInit() {
    this.setInitalform();
    this.setInitialTable();
  }

  setInitalform() {
    this.orderForm = this.fb.group({
      billingAddress: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]],
      billingDate: ['', [Validators.required]],
      createdDate: ['', [Validators.required]],
      hsn: ['0'],
      reqQty: ['0'],
      saleQty: ['0'],
      rate: ['0.00'],
      amt: ['0.00'],
      discount: ['0.00'],
      disAmount: ['0.00'],
      totalAmount: ['0.00']
    });

    this.orderForm.get('totalAmount')?.valueChanges.subscribe((val: any) => {
      this.calculateTaxes(val);
    });

    this.orderForm.get('rate')?.valueChanges.subscribe((val: any) => {
      this.ondisCountGet('');
      this.ondisCountamtGet('');
    })

    this.orderForm.get('hsn')?.disable();
    this.orderForm.get('reqQty')?.disable();
    this.orderForm.get('saleQty')?.disable();
    this.orderForm.get('amt')?.disable();
    this.orderForm.get('totalAmount')?.disable();
  }


  setInitialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.', hasButton: false },
      { key: 'Item Name', title: 'Item Name', hasButton: false },
      { key: 'HSN', title: 'HSN', hasButton: false },
      { key: 'Request Qty', title: 'Request Qty', hasButton: false },
      { key: 'Sale Qty', title: 'Sale Qty', hasButton: true },
      { key: 'Rate', title: 'Rate', hasButton: false },
      { key: 'Amount(₹)', title: 'Amount(₹)', hasButton: false },
      { key: 'Discount(%)', title: 'Discount(%)', hasButton: false },
      { key: 'Dis Amount(₹)', title: 'Dis Amount(₹)', hasButton: false },
      { key: 'Total Amount(₹)', title: 'Total Amount(₹)', hasButton: false },
    ]
  }

  getRequestDetails() {
    let payload = {
      "pk_request_id": this.requestId,
      "created_by": this.createdBy
    }
    this.orderService.requestById(payload).subscribe((res: any) => {
      this.requestOrderDetails = res?.body?.result || [];
      this.getShippingAddress();
      const formatDate = (date: any) => {
        if (!date) return '';
        if (date instanceof Date) {
          return date.toISOString().split('T')[0];
        }
        if (typeof date === 'string') {
          return date.split('T')[0];
        }
        return '';
      };

      if (this.requestOrderDetails?.length > 0) {
        this.orderForm.patchValue({
          billingAddress: this.requestOrderDetails[0]?.party_name,
          billingDate: formatDate(this.requestOrderDetails[0]?.created_date),
          hsn: this.requestOrderDetails[0]?.hsN_CODE,
          reqQty: this.requestOrderDetails[0]?.request_qty,
          amount: this.requestOrderDetails[0]?.amount,
        });
      }
    });
  }

  getShippingAddress() {
    let payload = {
      "empId": this.requestOrderDetails[0]?.created_by
    }
    this.orderService.shippingAdderss(payload).subscribe((res: any) => {
      this.shippingList = res?.body?.result || [];
    });
  }

  onChangeShippingAddress(event: any) {
    this.getTaxSlab();
  }

  getTaxSlab() {
    let payload = {
      "shipingId": this.orderForm.value.shippingAddress?.shipingId,
      "pk_request_id": this.requestOrderDetails[0]?.pk_request_id,
      "created_by": this.requestOrderDetails[0]?.created_by
    }
    this.orderService.interIntraStatus(payload).subscribe((res: any) => {
      this.taxSlabData = res?.body?.result || [];
    });
  }

  onQtyButtonClick(e: MouseEvent) {
    if (e.detail === 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (this.orderForm.value.shippingAddress === '') {
      this.orderForm.get('shippingAddress')?.markAsTouched();
      return;
    }

    const initialState: ModalOptions = {
      initialState: {
        editData: {
          devicetypeId: this.requestOrderDetails[0]?.fk_subcategory_id,
          qty: this.requestOrderDetails[0]?.request_qty
        }
      },
    };

    this.bsModalRef = this.modalService.show(
      VahanDeviceDropdownComponent,
      Object.assign(initialState, {
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );

    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {    
      console.log(val);
        
      this.selectDeviceData = null;
      this.selectDeviceData = val;
      this.orderForm.patchValue({
        saleQty: val.length > 0 ?  val?.length : 0,
      });
    });
  }

  onAmountGet(e: any) {
    e.preventDefault();
    if (this.orderForm.value.shippingAddress === '') {
      this.orderForm.get('shippingAddress')?.markAsTouched();
      return;
    }
    this.orderForm.get('saleQty')?.enable();

    if (this.orderForm.value.saleQty === '0') {
      this.orderForm.patchValue({ rate: '0' });
      this.notificationService.showInfo('Please select sale quantity first')
      this.orderForm.get('saleQty')?.disable();
      return;
    }

    const rate = Number(this.orderForm.value.rate) || 0;
    const saleQty = Number(this.orderForm.value.saleQty) || 0;
    let amt = rate * saleQty;
    let discount = Number(this.orderForm.value.discount) || 0;
    let disAmount = (amt * discount) / 100;
    let totalAmount = amt - disAmount;  

    this.orderForm.patchValue({
      amt: amt.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
    this.orderForm.get('saleQty')?.disable();
  }

  ondisCountGet(e: any) {
    if (this.orderForm.value.shippingAddress === '') {
      this.orderForm.get('shippingAddress')?.markAsTouched();
      return;
    }
    this.orderForm.get('amt')?.enable();

    const amount = Number(this.orderForm.value.amt) || 0;
    const discount = Number(this.orderForm.value.discount) || 0;

    let disAmount = (amount * discount) / 100;
    let totalAmount = amount - disAmount;    

    this.orderForm.patchValue({
      disAmount: disAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
    this.orderForm.get('amt')?.disable();
  }

  ondisCountamtGet(e: any) {
    if (this.orderForm.value.shippingAddress === '') {
      this.orderForm.get('shippingAddress')?.markAsTouched();
      return;
    }
    try {
      this.orderForm.get('amt')?.enable();

      const disAmount = +this.orderForm.value.disAmount || 0;
      const amount = +this.orderForm.value.amt || 0;

      if (disAmount < 0 || amount < 0) {
        throw new Error('Negative values are not allowed');
      }

      const discountPercentage = amount > 0 ? (disAmount / amount) * 100 : 0;
      const totalAmount = Math.max(0, amount - disAmount);

      this.orderForm.patchValue({
        discount: discountPercentage.toFixed(2),
        totalAmount: totalAmount.toFixed(2)
      }, { emitEvent: false });
      this.orderForm.get('amt')?.disable();
    } catch (error) {
      console.error('Error in discount calculation:', error);
      this.orderForm.get('amt')?.disable();
    }
  }

  calculateTaxes(totalAmount: number) {
    const taxSlab = this.taxSlabData || {};

    const amount = +totalAmount || 0;
    const cgstRate = +(taxSlab.cgst || 0);
    const sgstRate = +(taxSlab.sgst || 0);
    const igstRate = +(taxSlab.igst || 0);

    this.cgstAmt = +(amount * cgstRate / 100).toFixed(2);
    this.sgstAmt = +(amount * sgstRate / 100).toFixed(2);
    this.igstAmt = +(amount * igstRate / 100).toFixed(2);

    this.totalTax = +(this.cgstAmt + this.sgstAmt + this.igstAmt).toFixed(2);

    const netAmount = amount + this.totalTax;
    this.netAmt = +netAmount.toFixed(2);
  }

  generateInvoice(formvalue:any) {
    if(this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    if(this.netAmt === 0) {
      this.notificationService.showInfo('Please calculate taxes first');
      return; 
    }
    this.orderForm.get('hsn')?.enable();
    this.orderForm.get('reqQty')?.enable();
    this.orderForm.get('saleQty')?.enable();
    this.orderForm.get('amt')?.enable();
    this.orderForm.get('totalAmount')?.enable();

    const updatedFormValue = this.orderForm.getRawValue();
    
    let payload = {
        "customer_id": this.requestOrderDetails[0]?.created_by,
        "invoice_date": formvalue.createdDate,
        "gross_amount": +Number(updatedFormValue.amt).toFixed(2),
        "total_discount": +Number(updatedFormValue.discount).toFixed(2),
        "total_amount": +Number(updatedFormValue.totalAmount).toFixed(2),
        "cgst_amount": this.cgstAmt,
        "sgst_amount": this.sgstAmt,
        "igst_amount":this.igstAmt,
        "total_tax_amount": this.totalTax,
        "net_amount": this.netAmt,
        "created_by": Number(this.userDetails?.Id),
        "shipping_id": formvalue.shippingAddress?.shipingId,
        "is_intra_state": this.taxSlabData?.gsT_NAME === 'Inter-State' ? true : false,
        "subInvoice": {
          "product_id": this.requestOrderDetails[0]?.fk_subcategory_id,
          "quantity": updatedFormValue.saleQty,
          "unit_price": +Number(updatedFormValue.rate).toFixed(2),
          "net_amt": this.netAmt,
          "discount_pct": +Number(formvalue.discount).toFixed(2),
          "discount_amt": +Number(updatedFormValue.disAmount).toFixed(2),
          "taxable_value": +Number(updatedFormValue.totalAmount).toFixed(2),
          "cgst_pct": this.taxSlabData?.cgst,
          "cgst_amt": this.cgstAmt,
          "sgst_pct": this.taxSlabData?.sgst,
          "sgst_amt": this.sgstAmt,
          "igst_pct": this.taxSlabData?.igst,
          "igst_amt": this.igstAmt,
          "total_item_amt": +Number(updatedFormValue.totalAmount).toFixed(2),
          "hsn_code": updatedFormValue.hsn,
          "fk_gst_id":this.taxSlabData?.pk_gst_id 
        },
        "productList": this.formatProduct()
    }
    this.orderService.generateInvoice(payload).subscribe((res: any) => {
     if(res?.status === 200) {
      this.notificationService.showSuccess(res?.body?.actionResponse);
      setTimeout(() => {        
        this.router.navigate(['/admin/orders/order-details']);
      }, 2000);
     } else {
      this.notificationService.showError(res?.body?.actionResponse);
     }
     
    });

  }

  formatProduct() {
    return this.selectDeviceData?.map((item: any) => ({
      "customer_id": Number(this.requestOrderDetails[0]?.created_by),
      "product_id": item
    }
    )
    )
  }


}
